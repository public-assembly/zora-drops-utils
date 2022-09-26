import { ReactNode } from 'react'
import { createContext, useContext } from 'react'

export type DropsContextProps = {
  children?: ReactNode
}

export type DropsContextReturnTypes = {}

const DropsContextContext = createContext<DropsContextReturnTypes>({})

export function useDropsContextProvider() {
  return useContext(DropsContextContext)
}

export function DropsContextProvider({ children }: DropsContextProps) {
  return (
    <DropsContextContext.Provider value={{}}>{children}</DropsContextContext.Provider>
  )
}
