import '@/styles/globals.css'
import { Metadata } from 'next'
/* Components */
import { Toaster } from '@/components/ui/sonner'
/* Provider */
import { Providers } from '@/provider/providers'

export const metadata: Metadata = {
  title: '{title}',
  description: '{description}',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ja' className={'font-sans'}>
      <head />
      <body className='bg-background text-foreground h-full'>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
