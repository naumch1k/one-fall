import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { OverlayMenu } from '@/components/OverlayMenu/OverlayMenu'
import { SocialLinksSidebar } from '@/components/SocialLinksSidebar/SocialLinksSidebar'

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
        <SocialLinksSidebar />
      </main>
      <Footer />
      <OverlayMenu />
    </>
  )
}
