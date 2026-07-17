import axios from 'axios'
import { BaseProviderClass } from '../core/BaseClass.js'
import { generateCodeVerifier as generateState } from '../../pkce/generateCodeVerifier.js'
import { LinkedinConstants } from './linkedin.constants.js'
import type { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { UserProfile } from '../core/types/UserProfile.types.js';
import type { AuthParams as LinkedinAuthParams } from '../core/Shared/AuthParams.types.js'
import { getUserProfile } from '../core/Shared/helper/UserProfile.js';

export class LinkedinProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]


    constructor({ clientId, clientSecret, redirecturl, scope }: LinkedinAuthParams) {
        super()
        this.clientId = clientId
        this.scope = scope
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
    }
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
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const user = await getUserProfile(accessToken , LinkedinConstants.UserProfile , 'Likedin')
        return user
    }
}