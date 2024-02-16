import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemo } from 'react'

import { LayoutProvider } from './contexts/LayoutContext'

import './index.css'

import Routing from '@/core/Routing'

const App = () => {
  const queryClient = useMemo(() => new QueryClient(), [])
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <Routing />
      </LayoutProvider>
    </QueryClientProvider>
  )
}

export default App
