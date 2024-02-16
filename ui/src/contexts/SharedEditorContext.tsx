import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

import { DocumentResponse } from '@/core/interfaces'

interface SharedEditorContextProps {
  busyText: string
  setBusyText: (busy: string) => void
  actionsDrawerOpen: boolean
  setActionsDrawerOpen: (open: boolean) => void
  voiceNoteDrawerOpen: boolean
  setVoiceNoteDrawerOpen: (open: boolean) => void
  currentDocument: DocumentResponse
}

const sharedEditorContext = createContext<SharedEditorContextProps | null>(null)

export const useSharedEditorContext = () => {
  const context = useContext(sharedEditorContext)
  if (!context) {
    throw new Error(
      'useSharedEditorContext must be used within a SharedEditorContextProvider'
    )
  }
  return context
}

export const SharedEditorContextProvider = ({
  children,
  currentDocument,
}: {
  children: ReactNode
  currentDocument: DocumentResponse
}) => {
  const [busyText, setBusyText] = useState<string>('')
  const [actionsDrawerOpen, setActionsDrawerOpen] = useState<boolean>(false)
  const [voiceNoteDrawerOpen, setVoiceNoteDrawerOpen] = useState<boolean>(false)
  const value = useMemo(() => {
    return {
      busyText,
      setBusyText,
      actionsDrawerOpen,
      setActionsDrawerOpen,
      voiceNoteDrawerOpen,
      setVoiceNoteDrawerOpen,
      currentDocument,
    }
  }, [
    busyText,
    setBusyText,
    actionsDrawerOpen,
    setActionsDrawerOpen,
    voiceNoteDrawerOpen,
    setVoiceNoteDrawerOpen,
    currentDocument,
  ])

  return (
    <sharedEditorContext.Provider value={value}>
      {children}
    </sharedEditorContext.Provider>
  )
}
