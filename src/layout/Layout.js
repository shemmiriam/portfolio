import React, { useEffect } from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import BottomNav from '../components/BottomNav/BottomNav'
import { Container } from './LayoutStyles'

export const Layout = ({ children }) => {
  // Always open at the hero unless the URL points at a section
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  return (
    <Container>
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </Container>
  )
}
