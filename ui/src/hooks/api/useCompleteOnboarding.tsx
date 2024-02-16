import { useMutation } from '@tanstack/react-query'

import { FetcherError } from '@/util/fetcher'
import { apiFetcher } from '@/util/react-query'
import { urls } from '@/util/url'

const mutation = () => {
  return apiFetcher().put<void>(urls.api.users.completeOnboarding)
}

export function useCompleteOnboarding() {
  return useMutation<void, FetcherError, undefined>({
    mutationFn: mutation,
  })
}
