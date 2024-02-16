import React, { useEffect } from 'react'

import { useLayoutContext } from '@/contexts/LayoutContext'

const usePageTitle = (title: string, icon: React.ReactNode | null = null) => {
  const { setPageTitle, setIcon } = useLayoutContext()

  useEffect(() => {
    setPageTitle(title)
  }, [title])

  useEffect(() => {
    setIcon(icon)
  }, [icon])
}

export default usePageTitle
