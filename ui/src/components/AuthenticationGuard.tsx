import { withAuthenticationRequired } from '@auth0/auth0-react'

import FullPageLoader from '@/framework/FullPageLoader'

interface AuthenticationGuardProps {
  component: React.ComponentType<unknown>
}
export const AuthenticationGuard = ({
  component,
}: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <FullPageLoader />,
  })

  return <Component />
}
