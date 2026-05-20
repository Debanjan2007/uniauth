/**
 * Strict type for a provider redirect URI using HTTP or HTTPS.
 */
export type httpurl = `http://${string}` | `https://${string}`

/**
 * OAuth configuration parameters required to authenticate with Google.
 */
export interface GoogleAuthParams {
    clientId: string,
    redirecturl: httpurl,
    clientSecret: string,
    scope: string[],
}