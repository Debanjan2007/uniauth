import type { TokenResponse } from "./types/TokenResponse.types.js";
import type { UserProfile } from "./types/UserProfile.types.js";
import type { TokenRefresh } from "./types/RefreshToken.types.js"

/**
 * Base abstract class that all OAuth providers must implement.
 * Provides the standard interface for authorization, token exchange, and profile fetching.
 */
export abstract class BaseProviderClass {
    /**
     * Generates the authorization URL to redirect the user to the provider's consent screen.
     * @returns {string} The complete authorization URL.
     */
    abstract getAuthorizationUrl(): string;

    /**
     * Exchanges the authorization code for an access token.
     * @param {string} code - The authorization code received from the provider.
     * @returns {Promise<TokenResponse>} A promise that resolves to the token response.
     * @throws {Error} If the token exchange fails.
     */
    abstract exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse>;

    /**
     * Fetches the user's profile using the provided access token.
     * @param {string} accessToken - The valid access token.
     * @returns {Promise<UserProfile>} A promise that resolves to the standardized user profile.
     * @throws {Error} If fetching the profile fails.
     */
    abstract getUserProfile(accessToken: string): Promise<UserProfile>;

    /**
     * Refreshes the access token using a refresh token.
     * Optional method, as not all providers support token refresh.
     * @param {string} refreshToken - The refresh token.
     * @returns {Promise<TokenRefresh>} A promise that resolves to the new tokens.
     * @throws {Error} If refreshing the token fails.
     */
    refreshAccessToken?(refreshToken: string): Promise<TokenRefresh>;
}