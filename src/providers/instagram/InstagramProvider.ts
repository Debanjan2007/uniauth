import type { httpurl, TokenRefresh, TokenResponse, UserProfile } from '../../index.types.js';
import { BaseProviderClass } from '../core/BaseClass.js'
import { ExchangeCodeforToken } from '../core/Shared/helper/ExchangeForToken.js';
import { refreshToken } from '../core/Shared/helper/RefreshToken.js';
import { getUserProfile } from '../core/Shared/helper/UserProfile.js';
import { InstagramConstants } from './Instagram.constants.js';
import { generateCodeVerifier as generateState } from '../../pkce/generateCodeVerifier.js'


class InstagramProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]

    constructor({ clientId, clientSecret, redirecturl, scope }: { clientId: string, clientSecret: string, redirecturl: string, scope: string[] }) {
        super()
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
        this.scope = scope
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
            InstagramConstants.AuthUrl +
            "?" +
            params.toString().replace(/\+/g, "%20")

        return url
    }
    async exchangeCodeForToken(code: string, key?: string): Promise<TokenResponse> {
        if (!key) {
            throw new Error('Key is expected')
        }
        return await ExchangeCodeforToken(this.clientId, this.redirectUrl as httpurl, this.clientSecret, this.scope, code, key, InstagramConstants.AccessTokenUrl)
    }
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        return await getUserProfile(accessToken, InstagramConstants.UserProfile, "Instagram")
    }
    async refreshAccessToken(refreshTokenValue: string): Promise<TokenRefresh> {
        try {
            if (!refreshTokenValue) {
                throw new Error("No refreshtoken is provided!")
            }
            const response = await refreshToken(
                refreshTokenValue,
                this.clientId,
                this.clientSecret,
                InstagramConstants.AccessTokenUrl as unknown as httpurl
            )
            return response
        } catch (error) {
            throw new Error("Error occured while refreshing the token in github provider", { cause: error })
        }
    }
}

export {
    InstagramProvider
}