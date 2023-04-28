import { K2D } from 'next/font/google'
import { Gruppo } from 'next/font/google'
import Link from 'next/link'
import "../styles/Navbar.css"
import "../styles/global.css"

const k2d = K2D({ 
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],  
})
const gruppo = Gruppo({
  weight: '400',
  subsets: ['latin'], 
})

export const metadata = {
  title: 'AcheArchive',
  description: 'Archive of your pain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={k2d.className}>
      <body >
        <nav>
          <Link href="/">
            <h1 className={gruppo.className}>AcheArchive</h1>
          </Link>
          <button > Check your archive / Login </button>
        </nav>
        {children}
      </body>
    </html>
  )
}
