import React from "react"

export const Layout: React.FC<{
  Component: React.FC, pageProps: any
}> = ({ Component, pageProps }) => (
  <div className="min-h-screen w-full flex flex-col text-gray-800 leading-loose">
    <div className="relative z-20" id="modal-container" />
    <div className="flex-1 mt-5">
      <Component {...pageProps} />
    </div>
    <div className="mt-5">
      <a
        className="text-sm underline text-blue-500"
        href="https://github.com/iamtakagi/fitbit-insights"
      >https://github.com/iamtakagi/fitbit-insights</a>
    </div>
  </div>
)