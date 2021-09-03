import * as React from 'react'

import { Layout } from '../components/layout'

import '../components/tailwind.scss'
import '../components/index.scss'

const App: React.FC<{
  Component: React.FC, pageProps: any}> = ({ Component, pageProps }) => {
  return (
    <>
        <div className="container mx-auto text-left">
          <Layout Component={Component} pageProps={pageProps} />
        </div>
    </>
  )
}

export default App