import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga4'

import App from './App'

import { config } from '@/util/config.ts'

if (config.gaMeasurementId) {
  ReactGA.initialize(config.gaMeasurementId)
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.auth0Domain}
      clientId={config.auth0ClientId}
      authorizationParams={{
        audience: config.auth0Audience,
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
