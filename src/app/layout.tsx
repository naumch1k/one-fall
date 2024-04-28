import { Anton } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { OverlayMenu } from '@/components/OverlayMenu/OverlayMenu'

const anton = Anton({ 
  subsets: ['latin'],
  weight: ['400'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={anton.className}>
        <Header />
        {children}
        <Footer />
        <OverlayMenu />
      </body>
    </html>
  )
}
