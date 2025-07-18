'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount: number, error: unknown) => {
        const status = (error as AxiosResponse)?.status
        if (status === 404 || status === 400) return false
        return failureCount < 1
      },
    },
  },
})

const TanstackQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
export default TanstackQueryClientProvider
