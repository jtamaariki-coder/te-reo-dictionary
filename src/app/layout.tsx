import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Te Reo Māori Dictionary',
    template: '%s | Te Reo Māori Dictionary',
  },
  description:
    'A free, community-driven te reo Māori dictionary. Search English to Māori and Māori to English with audio pronunciation and example sentences.',
  keywords: ['te reo Maori', 'Maori dictionary', 'New Zealand', 'Aotearoa', 'language'],
  openGraph: {
    siteName: 'Te Reo Māori Dictionary',
    type: 'website',
    locale: 'en_NZ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mi" suppressHydrationWarning style={{ backgroundColor: '#F5F0E8' }}>
      <head>
        {/* Default is LIGHT (cream). Dark mode only activates if the user has explicitly chosen it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');document.documentElement.style.backgroundColor='#0F2318';}else{document.documentElement.style.backgroundColor='#F5F0E8';}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${lora.variable} min-h-screen flex flex-col pb-16 md:pb-0`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  )
}
