/**
 * Normalized token response returned by OAuth provider exchanges.
 */
export interface TokenResponse {
    /** The access token used to authenticate API requests. */
    accessToken: string
    /** The optional refresh token used to obtain new access tokens. */
    refreshToken?: string
    /** The type of token, typically "Bearer". */
    tokenType?: string
    /** The lifetime in seconds of the access token. */
    expiresIn?: number
    /** A space-separated list of scopes granted by the access token. */
    scope?: string
    /** The optional ID token provided by OIDC compliant providers. */
    idToken?: string,
    /** The raw JSON response received from the provider's token endpoint. */
    raw: unknown
}