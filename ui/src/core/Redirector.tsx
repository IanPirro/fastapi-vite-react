import { useAuth0 } from '@auth0/auth0-react'

import { QUERY_KEYS } from '@/core/constants'
import { User } from '@/core/interfaces'
import FullPageLoader from '@/framework/FullPageLoader'
import CreateAccountPage from '@/pages/CreateAccountPage'
import OnboardingPage from '@/pages/OnboardingPage'
import { useAPI } from '@/util/react-query'
import { urls } from '@/util/url'

interface RedirectorProps {
  children: React.ReactNode
}

export default function Redirector({ children }: RedirectorProps) {
  const { isLoading, user, logout } = useAuth0()

  const {
    data,
    isLoading: userRecordLoading,
    error,
  } = useAPI<User>(QUERY_KEYS.me, urls.api.users.me, {
    retry: false,
    enabled: !!user,
  })

  if (isLoading || userRecordLoading) {
    return <FullPageLoader />
  }

  if (error?.response?.status === 403) {
    logout()
    return null
  }

  // If there is no user record, then the user has not been created in the database
  if (error?.response?.status === 404) {
    return <CreateAccountPage />
  }

  if (data?.has_seen_onboarding === false) {
    return <OnboardingPage />
  }

  return <>{children}</>
}
