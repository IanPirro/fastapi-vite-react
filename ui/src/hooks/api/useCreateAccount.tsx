import { useMutation } from '@tanstack/react-query'

import { UserCreateRequest, UserCreateResponse } from '@/core/interfaces'
import { FetcherError } from '@/util/fetcher'
import { apiFetcher } from '@/util/react-query'
import { urls } from '@/util/url'

const mutation = (json: UserCreateRequest) =>
  apiFetcher().post<UserCreateResponse>(urls.api.users.create, {
    json,
  })

export function useCreateAccount() {
  return useMutation<UserCreateResponse, FetcherError, UserCreateRequest>({
    mutationFn: mutation,
  })
}
