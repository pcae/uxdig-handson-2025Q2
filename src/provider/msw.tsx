'use client'

const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  // Use msw
  if (process.env.NODE_ENV === 'development' && process.env.MOCK_DISABLED !== 'true') {
    const MockServer = () => import('src/mocks/worker')
    MockServer()
  }
  return <>{children}</>
}

export default MSWProvider
