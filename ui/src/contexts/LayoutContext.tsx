import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

interface LayoutContextProps {
  pageTitle: string
  setPageTitle: (pageTitle: string) => void
  icon?: React.ReactNode | null
  setIcon: (icon: React.ReactNode) => void
}

const layoutContext = createContext<LayoutContextProps | null>(null)

export const useLayoutContext = () => {
  const context = useContext(layoutContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }
  return context
}

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState<string>('')
  const [icon, setIcon] = useState<React.ReactNode>(null)
  const value = useMemo(() => {
    return {
      pageTitle,
      setPageTitle,
      icon,
      setIcon,
    }
  }, [pageTitle, icon])

  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  )
}
