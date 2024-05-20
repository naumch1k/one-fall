import { Anton, Montserrat } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { OverlayMenu } from '@/components/OverlayMenu/OverlayMenu'

const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-anton',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.variable} ${anton.variable}`}>
        <Header />
        {children}
        <Footer />
        <OverlayMenu />
      </body>
    </html>
  )
}
