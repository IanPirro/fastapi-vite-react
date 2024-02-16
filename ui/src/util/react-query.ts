import { createAuth0Client } from '@auth0/auth0-spa-js'
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query'

import { createFetcherClient, FetcherError, FetcherOptions } from './fetcher'

import { config } from '@/util/config.ts'

async function bearerToken() {
  const auth0 = await createAuth0Client({
    domain: config.auth0Domain,
    clientId: config.auth0ClientId,
    authorizationParams: {
      audience: config.auth0Audience,
      redirect_uri: window.location.origin,
    },
    useRefreshTokens: true,
    useRefreshTokensFallback: true,
    cacheLocation: 'localstorage',
  })

  return await auth0.getTokenSilently()
}

export const apiFetcher = (
  overrideOptions: Partial<Omit<FetcherOptions, 'method'>> = {}
) =>
  createFetcherClient({
    baseURL: config.apiURL,
    bearerToken,
    ...overrideOptions,
  })

export interface ErrorResponse {
  error: string
  message?: string
  statusCode: number
}

export function useAPI<T>(
  key: QueryKey,
  url: string | null | undefined,
  options: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> = {},
  fetcherOptions: Parameters<typeof apiFetcher>[0] = {}
) {
  const endpoint = url ? config.apiURL + url : undefined
  const defaultEnabled = 'enabled' in options ? options.enabled : true
  return useQuery<T, FetcherError, T>({
    queryKey: key,
    queryFn: ({ signal }) =>
      apiFetcher(fetcherOptions).get<T>(endpoint!, {
        fetchOptions: {
          signal,
        },
      }),
    // Disable refetching on window focus by default
    refetchOnWindowFocus: false,
    ...options,
    enabled: !!endpoint && defaultEnabled,
  } as UseQueryOptions<T, FetcherError, T, QueryKey>)
}
