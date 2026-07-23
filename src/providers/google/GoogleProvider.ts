import { BaseProviderClass } from '../core/BaseClass.js'
import { GoogleConstants } from './Google.constants.js'
import { generateAuthUrl } from '../core/Shared/helper/GenerateAuthUrl.js'
import type { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { AuthParams as GoogleAuthParams, httpurl } from '../core/Shared/AuthParams.types.js'
import type { UserProfile } from '../core/types/UserProfile.types.js';
import { ExchangeCodeforToken } from '../core/Shared/helper/ExchangeForToken.js'; 
import { getUserProfile } from '../core/Shared/helper/UserProfile.js'
/**
 * Google OAuth 2.0 Provider implementation.
 * Supports standard authorization code flow with PKCE.
 * 
 * @example
 * ```typescript
 * const google = new GoogleProvider({
 *   clientId: '...',
 *   clientSecret: '...',
 *   redirecturl: 'http://...',
 *   scope: ['email', 'profile']
 * });
 * ```
 */
export class GoogleProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]

    /**
     * Initializes the Google OAuth provider.
     * @param {GoogleAuthParams} params - The authentication parameters for Google.
     */
    constructor({ clientId, clientSecret, redirecturl, scope} : GoogleAuthParams){
        super()
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
        this.scope = scope
    }

    /**
     * Generates the authorization URL for Google OAuth with PKCE parameters.
     * Uses PKCE flow (code_challenge + code_verifier stored in memory).
     * @returns {string} The Google authorization URL containing the `key` parameter.
     */
    getAuthorizationUrl(): string {
        const uri = generateAuthUrl(this.clientId , this.redirectUrl as httpurl, this.scope , GoogleConstants.AuthUrl)
        return uri
    }

    /**
     * Exchanges the authorization code for an access token.
     * Requires the `key` parameter to retrieve the PKCE `code_verifier`.
     * 
     * @param {string} code - The authorization code received from Google.
     * @param {string} [key] - The key extracted from the initial auth URL using `ExtractKey`.
     * @returns {Promise<TokenResponse>} A promise that resolves to the Google token response.
     * @throws {Error} If `key` is missing or token exchange fails.
     */
    async exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse> {
        if(!key){
            throw new Error('Key is expected')
        }
        const response = await ExchangeCodeforToken(this.clientId , this.redirectUrl as httpurl , this.clientSecret , this.scope , code , key , GoogleConstants.AccessTokenUrl)
        console.log(response);
        return response
    }
    
    /**
     * Fetches the authenticated user's profile from Google.
     * 
     * @param {string} accessToken - The valid Google access token.
     * @returns {Promise<UserProfile>} A promise that resolves to the user's profile information.
     * @throws {Error} If profile fetching fails.
     */
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const data = await getUserProfile(accessToken, GoogleConstants.UserProfile , "Google")
        console.log(data);        
        return data
    }
}