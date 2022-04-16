import React from 'react'
import Footer from './footer'
import Navbar from './navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
