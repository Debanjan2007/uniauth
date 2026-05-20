/**
 * Normalized token response returned by OAuth provider exchanges.
 */
export interface TokenResponse {
    accessToken: string
    refreshToken?: string
    tokenType?: string
    expiresIn?: number
    scope?: string
    idToken?: string,
    raw: unknown
}