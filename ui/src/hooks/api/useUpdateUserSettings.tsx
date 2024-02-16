import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/core/constants'
import { User, UserUpdateSettingsRequest } from '@/core/interfaces'
import { apiFetcher } from '@/util/react-query'
import { urls } from '@/util/url'

const mutation = (json: UserUpdateSettingsRequest) => {
  return apiFetcher().put<void>(urls.api.users.updateSettings, {
    json,
  })
}

export function useUpdateUserSettings() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: mutation,
    onMutate: async (variables) => {
      const { is_voice_notes_enabled } = variables
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.me })

      const previousData = queryClient.getQueryData<User>(QUERY_KEYS.me)

      if (previousData) {
        queryClient.setQueryData<User>(QUERY_KEYS.me, {
          ...previousData,
          is_voice_notes_enabled,
        })
      }

      return { previousData }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<User>(QUERY_KEYS.me, context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.me })
    },
  })
}
