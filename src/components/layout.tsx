import React from "react"

export const Layout: React.FC<{
  Component: React.FC, pageProps: any
}> = ({ Component, pageProps }) => (
  <div className="min-h-screen w-full flex flex-col text-gray-800 leading-loose">
    <div className="mt-5">
      <Component {...pageProps} />
      <a
        className="text-sm underline text-blue-500 mt-5"
        href="https://github.com/iamtakagi/fitbit-web-viewer"
      >https://github.com/iamtakagi/fitbit-web-viewer</a>
    </div>
  </div>
)
