import axios from 'axios';
import { BaseProviderClass } from '../BaseClass.js'
import { getMemory } from '../../pkce/sessionManagement.js'
import { GoogleConstants } from './Google.constants.js'
import { generateAuthUrl } from '../core/helper/GenerateAuthUrl.js'
import type { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { AuthParams as GoogleAuthParams, httpurl } from '../core/Shared/AuthParams.types.js'
import type { UserProfile } from '../core/types/UserProfile.types.js';
export class GoogleProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]

    constructor({ clientId, clientSecret, redirecturl, scope} : GoogleAuthParams){
        super()
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
        this.scope = scope
    }

    getAuthorizationUrl(): string {
        const uri = generateAuthUrl(this.clientId , this.redirectUrl as httpurl, this.scope , GoogleConstants.AuthUrl)
        return uri
    }
    async exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse> {
        const code_verifier = key ? getMemory(key) : undefined
        if (!code_verifier.value) {
            throw new Error('Session expired or invalid key')
        }
        try {
            const url = GoogleConstants.AccessTokenUrl + '?' + new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                client_id: this.clientId,
                redirect_uri: this.redirectUrl,
                code_verifier: code_verifier.value,
                client_secret: this.clientSecret
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
            return {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresIn: expires_in,
                scope: scope,
                tokenType: token_type,
                idToken: id_token,
                raw: data
            }
        } catch (error) {
            throw new Error("Error occured exchanging code for the access token by the google provider", { cause: error })
        }
    }

    async getUserProfile(accessToken: string): Promise<UserProfile> {
        try {
            const { data } = await axios.get<{
            email?: string;
            name?: string;
            picture?: string;
        }>(
            GoogleConstants.UserProfile , {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const { picture, name, email } = data
        const user: UserProfile = {
            provider: 'Google',
            avatarUrl: picture,
            displayName: name,
            email: email,
            raw: data
        }
        return user
        } catch (error) {
            throw new Error('Google user profile fetching is not implemented yet.', {cause: error})
        }
    }
}