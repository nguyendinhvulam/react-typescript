import { createContext, ReactNode, useState } from 'react'

interface ContextProps {
  toggleAsideButton: string,
  containerClassnames: string,
  setContainerClassnames: (value: string) => void
}

export const AsideContext = createContext<ContextProps>({ toggleAsideButton: 'toggle-aside-btn', containerClassnames: '', setContainerClassnames: () => { } })

const AsideContextProvider = ({ children }: { children: ReactNode }) => {
  const [containerClassnames, setContainerClassnames] = useState('')

  return <AsideContext.Provider value={{ toggleAsideButton: 'toggle-aside-btn', containerClassnames, setContainerClassnames }}>
    {children}
  </AsideContext.Provider>
}

export default AsideContextProvider