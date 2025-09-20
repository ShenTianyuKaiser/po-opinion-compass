import React from 'react'
import { Header } from '../header'
import { FooterPanel } from 'src/components/footer'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <div className="h-min-screen">
      <Header />
      {page}
      <FooterPanel />
    </div>
  )
}
