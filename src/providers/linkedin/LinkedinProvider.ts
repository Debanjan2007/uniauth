import axios from 'axios'
import { BaseProviderClass } from '../core/BaseClass.js'
import { generateCodeVerifier as generateState } from '../../pkce/generateCodeVerifier.js'
import { LinkedinConstants } from './linkedin.constants.js'
import type { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { UserProfile } from '../core/types/UserProfile.types.js';
import type { httpurl, AuthParams as LinkedinAuthParams } from '../core/Shared/AuthParams.types.js'
import { getUserProfile } from '../core/Shared/helper/UserProfile.js';
import { refreshToken } from "../core/Shared/helper/RefreshToken.js"
import type { TokenRefresh } from "../core/types/RefreshToken.types.js"

/**
 * LinkedIn OAuth 2.0 Provider implementation.
 * Supports standard authorization code flow with state parameter.
 * Also supports access token refreshing.
 * 
 * @example
 * ```typescript
 * const linkedin = new LinkedinProvider({
 *   clientId: '...',
 *   clientSecret: '...',
 *   redirecturl: 'http://...',
 *   scope: ['openid', 'profile', 'email']
 * });
 * ```
 */
export class LinkedinProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]

    /**
     * Initializes the LinkedIn OAuth provider.
     * @param {LinkedinAuthParams} params - The authentication parameters for LinkedIn.
     */
    constructor({ clientId, clientSecret, redirecturl, scope }: LinkedinAuthParams) {
        super()
        this.clientId = clientId
        this.scope = scope
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
    }

    /**
     * Exchanges the authorization code for an access token.
     * LinkedIn uses standard flow, so no PKCE key is needed.
     * 
     * @param {string} code - The authorization code received from LinkedIn.
     * @returns {Promise<TokenResponse>} A promise that resolves to the LinkedIn token response.
     * @throws {Error} If token exchange fails.
     */
    async exchangeCodeForToken(code: string): Promise<TokenResponse> {
        try {
            const url = LinkedinConstants.AccessTokenUrl + '?' + new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUrl,
                client_id: this.clientId,
                client_secret: this.clientSecret,
            })

            const { data } = await axios.post<{ access_token: string; expires_in: number; refresh_token?: string; scope?: string; token_type: string; id_token?: string }>(
                url,
                undefined,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            )
            const { access_token, expires_in, refresh_token, scope, token_type, id_token } = data
            const response: TokenResponse = {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in,
                idToken: id_token,
                scope: scope,
                tokenType: token_type,
                raw: data
            }

            return response
        } catch (error) {
            console.log(error);
            throw new Error("Error occured exchanging code for the access token", { cause: error })
        }
    }

    /**
     * Generates the authorization URL for LinkedIn OAuth.
     * Standard auth code flow with a generated `state` parameter.
     * 
     * @returns {string} The complete LinkedIn authorization URL.
     */
    getAuthorizationUrl(): string {
        const state: string = generateState()
        const params = new URLSearchParams({
            response_type: "code",
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            state,
            scope: this.scope.join(" ")
        })

        const url =
            LinkedinConstants.AuthUrl +
            "?" +
            params.toString().replace(/\+/g, "%20")

        return url
    }

    /**
     * Fetches the authenticated user's profile from LinkedIn.
     * 
     * @param {string} accessToken - The valid LinkedIn access token.
     * @returns {Promise<UserProfile>} A promise that resolves to the user's profile information.
     * @throws {Error} If profile fetching fails.
     */
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const user = await getUserProfile(accessToken, LinkedinConstants.UserProfile, 'Likedin')
        return user
    }

    /**
     * Refreshes the access token using a previously obtained refresh token.
     * This is the only provider currently supporting token refresh.
     * 
     * @param {string} refreshTokenValue - The valid LinkedIn refresh token.
     * @returns {Promise<TokenRefresh>} A promise that resolves to the refreshed tokens.
     * @throws {Error} If refresh token is missing or refresh request fails.
     */
    async refreshAccessToken(refreshTokenValue: string): Promise<TokenRefresh> {
        try {
            if (!refreshTokenValue) {
                throw new Error("Refresh token is required to refresh the access token")
            }

            const response = await refreshToken(
                refreshTokenValue,
                this.clientId,
                this.clientSecret,
                LinkedinConstants.AccessTokenUrl as unknown as httpurl
            )
            return response
        } catch (error) {
            throw new Error("can't refresgh the token right now!Try it later", { cause: error })
        }
    }
}