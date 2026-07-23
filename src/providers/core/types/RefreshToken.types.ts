/**
 * Represents the response received when refreshing an access token.
 */
export interface TokenRefresh {
    /** The new access token to be used for authentication. */
    access_token : string,
    /** The lifetime in seconds of the new access token. */
    expires_in: number,
    /** The new refresh token to be used for future refresh requests. */
    refresh_token: string,
    /** The lifetime in seconds of the new refresh token. */
    refresh_token_expires_in: number,
    /** The scopes granted by the new access token. */
    scope: string
}