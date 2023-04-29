'use client';

import { K2D } from 'next/font/google'
import { Gruppo } from 'next/font/google'
import Link from 'next/link'
import "../styles/Navbar.css"
import "../styles/global.css"
import "../styles/Footer.css"

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
        <div className='MainContainer'>
          <nav>
            <Link href="/">
              <h1 className={gruppo.className}>AcheArchive</h1>
            </Link>
            <button id="loginButton"> Check your archive / Login </button>
          </nav>
          {children}
        </div>
        <footer> © 2023 Pradip ANANDA, Tous droits réservés. </footer>
      </body>
    </html>
  )
}
