'use client'

import { Provider } from 'jotai'

const JotaiRootProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>
}
export default JotaiRootProvider
