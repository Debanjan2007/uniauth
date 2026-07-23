import type { TokenResponse, UserProfile } from '../../index.types.js'
import { BaseProviderClass } from '../core/BaseClass.js'
import { generateAuthUrl } from '../core/Shared/helper/GenerateAuthUrl.js'
import type { httpurl } from '../core/Shared/AuthParams.types.js'
import { GithubConstants } from './Guthub.constants.js'
import { ExchangeCodeforToken } from '../core/Shared/helper/ExchangeForToken.js' 
import { getUserProfile } from '../core/Shared/helper/UserProfile.js'
import type { AuthParams as GithubAuthParams } from '../core/Shared/AuthParams.types.js'

/**
 * GitHub OAuth 2.0 Provider implementation.
 * Supports standard authorization code flow with PKCE.
 * 
 * @example
 * ```typescript
 * const github = new GithubProvider({
 *   clientId: '...',
 *   clientSecret: '...',
 *   redirecturl: 'http://...',
 *   scope: ['user', 'repo']
 * });
 * ```
 */
class GithubProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]

    /**
     * Initializes the GitHub OAuth provider.
     * @param {GithubAuthParams} params - The authentication parameters for GitHub.
     */
    constructor({ clientId, clientSecret, redirecturl, scope} : GithubAuthParams) {
        super()
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
        this.scope = scope
    }
    
    /**
     * Generates the authorization URL for GitHub OAuth with PKCE parameters.
     * Uses PKCE flow (code_challenge + code_verifier stored in memory).
     * 
     * @returns {string} The GitHub authorization URL containing the `key` parameter.
     */
    getAuthorizationUrl(): string {
        const uri = generateAuthUrl(this.clientId , this.redirectUrl as httpurl, this.scope , GithubConstants.AuthUrl)
        console.log(uri);        
        return uri
    }

    /**
     * Exchanges the authorization code for an access token.
     * Requires the `key` parameter to retrieve the PKCE `code_verifier`.
     * 
     * @param {string} code - The authorization code received from GitHub.
     * @param {string} [key] - The key extracted from the initial auth URL using `ExtractKey`.
     * @returns {Promise<TokenResponse>} A promise that resolves to the GitHub token response.
     * @throws {Error} If `key` is missing or token exchange fails.
     */
    async exchangeCodeForToken(code: string , key? : string): Promise<TokenResponse> {
        if(!key){
            throw new Error('Key is expected')
        }
        const response = await ExchangeCodeforToken(this.clientId , this.redirectUrl as httpurl , this.clientSecret , this.scope , code , key , GithubConstants.AccessTokenUrl)
        console.log(response);
        return response
    }

    /**
     * Fetches the authenticated user's profile from GitHub.
     * 
     * @param {string} accessToken - The valid GitHub access token.
     * @returns {Promise<UserProfile>} A promise that resolves to the user's profile information.
     * @throws {Error} If profile fetching fails.
     */
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const data = await getUserProfile(accessToken, GithubConstants.UserProfile , 'Github')
        console.log(data);        
        return data
    }
}

export {
    GithubProvider
}
