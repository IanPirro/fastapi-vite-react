import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { AuthenticationGuard } from '@/components/AuthenticationGuard'
import AppLayout from '@/layouts/AppLayout'
import InfoPage from '@/pages/InfoPage'

const Routing = () => {
  const routes = createRoutesFromElements([
    <Route path="/" element={<AuthenticationGuard component={AppLayout} />}>
      <Route index Component={InfoPage} />
    </Route>,
  ])
  const Router = createBrowserRouter(routes)
  return <RouterProvider router={Router}></RouterProvider>
}

export default Routing
