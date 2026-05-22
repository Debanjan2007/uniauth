/**
 * Strict type for a provider redirect URI using HTTP or HTTPS.
 */
export type httpurl = `http://${string}` | `https://${string}`

/**
 * OAuth configuration parameters required
 */
export interface AuthParams {
    clientId: string,
    redirecturl: httpurl,
    clientSecret: string,
    scope: string[]
}