import { from } from 'env-var'

const env = from({
  IS_PRODUCTION: import.meta.env.PROD,
  VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID: import.meta.env.VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_AUDIENCE: import.meta.env.VITE_AUTH0_AUDIENCE,
  VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
  VITE_API_URL: import.meta.env.VITE_API_URL,
})

export const config = {
  isProduction: Boolean(env.get('IS_PRODUCTION').default('false').asString()),
  auth0Domain: env.get('VITE_AUTH0_DOMAIN').required().asString(),
  auth0ClientId: env.get('VITE_AUTH0_CLIENT_ID').required().asString(),
  gaMeasurementId: env.get('VITE_GA_MEASUREMENT_ID').asString(),
  auth0Audience: env
    .get('VITE_AUTH0_AUDIENCE')
    .required()
    .default('http://localhost:4200')
    .asString(),
  apiURL: env.get('VITE_API_URL').required().asString(),
}
