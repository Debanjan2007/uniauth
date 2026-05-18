import { BaseProviderClass } from '../BaseClass.js'
import type { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { GoogleAuthParams } from './Google.types.js'
import type { UserProfile } from '../core/types/UserProfile.types.js';
import { generateCodeChallenge } from '../../pkce/generateCodeChallenge.js'
import { generateCodeVerifier } from '../../pkce/generateCodeVerifier.js'
import { useMemory , getMemory } from '../../pkce/sessionManagement.js'
import { generateUniqueid } from '../../utils/UniqueKeyGenerate.js'
import { GoogleConstants } from './Google.constants.js'
import axios from 'axios';
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
        const key : string = generateUniqueid()
        const code_verifier : string = generateCodeVerifier()
        useMemory({key , value: code_verifier , ttl: 60000})
        const code_challenge = generateCodeChallenge(code_verifier)
        const state = generateUniqueid()
        const param =  new URLSearchParams({
            client_id: this.clientId ,
            redirect_uri: this.redirectUrl ,
            response_type: 'code',
            state: state,
            scope: this.scope.join(" "),
            code_challenge: code_challenge,
            code_challenge_method: 'S256',
            key: key
        })
        const url = GoogleConstants.AuthUrl + '?' +
            param.toString().replace(/\+/g, "%20")

        return url
    }
    async exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse> {
        const code_verifier = key ? getMemory(key) : undefined
        if (!code_verifier) {
            throw new Error('Session expired or invalid key')
        }
        try {
            const url = GoogleConstants.AccessTokenUrl + '?' + new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                client_id: this.clientId,
                redirect_uri: this.redirectUrl,
                code_verifier: code_verifier,
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
                idToken: id_token
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