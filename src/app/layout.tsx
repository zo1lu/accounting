import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { useRouter } from 'next/navigation'
import './globals.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../../src/firebase/firebase'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Accounting App',
  description: 'money money save save',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
