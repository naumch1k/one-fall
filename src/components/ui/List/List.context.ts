import { createContext, useContext } from 'react'

import type { styles } from './List.styles'

export type ListType = keyof typeof styles

type ListContext = {
  type: ListType
}

const ListContext = createContext<ListContext | undefined>(undefined)

export const ListProvider = ListContext.Provider

export const useList = (): ListContext => {
  const context = useContext(ListContext)

  if (context === undefined) {
    throw new Error('The useList hook must be used within a ListProvider')
  }

  return context
}
