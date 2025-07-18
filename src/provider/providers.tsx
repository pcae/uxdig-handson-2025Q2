'use client'

/* Provider */
import JotaiRootProvider from '@/provider/jotai'
import MSWProvider from '@/provider/msw/msw-provider'
import TanstackQueryClientProvider from '@/provider/tanstack'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackQueryClientProvider>
      <JotaiRootProvider>
        <MSWProvider>{children}</MSWProvider>
      </JotaiRootProvider>
    </TanstackQueryClientProvider>
  )
}
