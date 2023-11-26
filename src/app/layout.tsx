import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
 
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Learn English Words',
  description: 'NCK',
}

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en">

      <body className={inter.className} data-bs-theme="dark">

        <div className='container mt-4'>
          <div className='d-flex   gap-2 justify-content-center'>
            <Link className='btn btn-secondary' href={"/"}>Home</Link>
            <Link className='btn btn-success' href={"/ilearned"}>I Learned</Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  )
}
