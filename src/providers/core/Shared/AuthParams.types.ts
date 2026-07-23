/**
 * Strict type for a provider redirect URI using HTTP or HTTPS.
 */
export type httpurl = `http://${string}` | `https://${string}`

/**
 * OAuth configuration parameters required for setting up a provider.
 */
export interface AuthParams {
    /** The client ID obtained from the OAuth provider's developer console. */
    clientId: string,
    /** The authorized redirect URI where the provider will send the user after consent. Must be HTTP/HTTPS. */
    redirecturl: httpurl,
    /** The client secret obtained from the OAuth provider's developer console. */
    clientSecret: string,
    /** Array of permissions (scopes) requested from the user. */
    scope: string[]
}