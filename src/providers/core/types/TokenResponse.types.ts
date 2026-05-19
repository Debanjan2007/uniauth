export interface TokenResponse {
    accessToken: string
    refreshToken?: string
    tokenType?: string
    expiresIn?: number
    scope?: string
    idToken?: string,
    raw: unknown
}