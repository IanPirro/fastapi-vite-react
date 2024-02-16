import { useAuth0 } from '@auth0/auth0-react'

import LogoutButton from '@/components/LogoutButton'
import { QUERY_KEYS } from '@/core/constants'
import { User } from '@/core/interfaces'
import usePageTitle from '@/hooks/usePageTitle'
import { useAPI } from '@/util/react-query'
import { urls } from '@/util/url'

function InfoPage() {
  const { user } = useAuth0()
  const {
    data: userRecord,
    isLoading: userRecordLoading,
    error,
  } = useAPI<User>(QUERY_KEYS.me, urls.api.users.me, {
    retry: false,
  })

  usePageTitle('')

  if (userRecordLoading) {
    return <div>Loading ...</div>
  }

  if (!user || !userRecord || error) {
    return null
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Profile Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application settings.
        </p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {`${userRecord?.first_name} ${userRecord?.last_name}` ||
                'Test User'}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Email Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900"></dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 text-right">
              <LogoutButton />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default InfoPage
