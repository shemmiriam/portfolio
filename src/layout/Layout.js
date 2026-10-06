import React from 'react'

import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import BottomNav from '../components/BottomNav/BottomNav'
import { Container } from './LayoutStyles'

export const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <main>{children}</main>
      <Footer />
      <BottomNav />
    </Container>
  )
}
