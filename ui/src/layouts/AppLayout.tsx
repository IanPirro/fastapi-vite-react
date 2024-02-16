import { Outlet } from 'react-router-dom'

import NavBar from '@/components/NavBar'
import { useLayoutContext } from '@/contexts/LayoutContext'
import Redirector from '@/core/Redirector'

export default function AppLayout() {
  const { pageTitle, icon } = useLayoutContext()
  return (
    <Redirector>
      <div className="min-h-full">
        <NavBar />
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-normal leading-tight tracking-tight text-gray-900">
                {icon && icon}
                {pageTitle}
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </Redirector>
  )
}
