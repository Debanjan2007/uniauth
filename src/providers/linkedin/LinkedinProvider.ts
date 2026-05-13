import axios from 'axios'
import { BaseProviderClass } from '../core/BaseClass'
import { TokenResponse } from '../core/types/TokenResponse.types';
import { UserProfile } from '../core/types/UserProfile.types';
import { generateCodeVerifier as generateState } from '../../pkce/generateCodeVerifier'
import { LinkedinConstants } from './linkedin.constants'
import type { LinkedinAuthParams } from './Linkedin.types'

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
            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUrl,
                client_id: this.clientId,
                client_secret: this.clientSecret,
            }).toString()

            const { data } = await axios.post<{ access_token: string; expires_in: number; refresh_token?: string; scope?: string; token_type: string; id_token?: string }>(
                LinkedinConstants.AccessTokenUrl,
                body,
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
                tokenType: token_type
            }

            return response
        } catch (error) {
            console.error("Token exchange error:", {
                message: error instanceof Error ? error.message : String(error),
                name: error instanceof Error ? error.name : undefined,
                status: (error as any)?.response?.status
            });
            throw new Error("Error occured exchanging code for the access token", { cause: error })
        }
    }
    getAuthorizationUrl(): string {
        const state: string = generateState()
        const params = new URLSearchParams({
            response_type: "code",
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            state: state,
            scope: this.scope.join(" ")
        })
        const url = LinkedinConstants.AuthUrl + '?' + params.toString()

        return url
    }
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const { data } = await axios.get<{
            email?: string;
            name?: string;
            picture?: string;
        }>(LinkedinConstants.UserProfile, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const { picture, name, email } = data
        const user: UserProfile = {
            provider: 'Linkedin',
            avatarUrl: picture,
            displayName: name,
            email: email,
            raw: data
        }
        return user
    }
}