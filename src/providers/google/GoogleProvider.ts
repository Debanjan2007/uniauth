import { BaseProviderClass } from '../BaseClass.js'
import { GoogleConstants } from './Google.constants.js'
import { generateAuthUrl } from '../core/Shared/helper/GenerateAuthUrl.js'
import type { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { AuthParams as GoogleAuthParams, httpurl } from '../core/Shared/AuthParams.types.js'
import type { UserProfile } from '../core/types/UserProfile.types.js';
import { ExchangeCodeforToken } from '../core/Shared/helper/ExchangeForToken.js'; 
import { getUserProfile } from '../core/Shared/helper/UserProfile.js'
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
        if(!key){
            throw new Error('Key is expected')
        }
        const response = await ExchangeCodeforToken(this.clientId , this.redirectUrl as httpurl , this.clientSecret , this.scope , code , key , GoogleConstants.AccessTokenUrl)
        console.log(response);
        return response
    }
    

    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const data = await getUserProfile(accessToken, GoogleConstants.UserProfile , "Google")
        console.log(data);        
        return data
    }
}