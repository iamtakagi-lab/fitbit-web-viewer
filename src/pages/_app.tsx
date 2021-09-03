import * as React from 'react'

import { ToastProvider } from 'react-toast-notifications'
import { Layout } from '../components/layout'

import '../components/tailwind.scss'
import '../components/index.scss'

const App: React.FC<{
  Component: React.FC, pageProps: any}> = ({ Component, pageProps }) => {
  return (
    <>
      <ToastProvider placement="top-center" autoDismissTimeout={5000}>
        <div className="container mx-auto text-left">
          <Layout Component={Component} pageProps={pageProps} />
        </div>
      </ToastProvider>
    </>
  )
}

export default App