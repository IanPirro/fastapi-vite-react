import { useAuth0 } from '@auth0/auth0-react'

import Button from '@/framework/Button'

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'link'
}

const LogoutButton = ({ variant }: LogoutButtonProps) => {
  const { logout } = useAuth0()

  return (
    <Button onClick={() => logout()} variant={variant}>
      Log out
    </Button>
  )
}

export default LogoutButton
