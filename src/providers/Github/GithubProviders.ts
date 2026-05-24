import type { TokenResponse, UserProfile } from '../../index.types.js'
import { BaseProviderClass } from '../core/BaseClass.js'
import { generateAuthUrl } from '../core/Shared/helper/GenerateAuthUrl.js'
import type { httpurl } from '../core/Shared/AuthParams.types.js'
import { GithubConstants } from './Guthub.constants.js'
import { ExchangeCodeforToken } from '../core/Shared/helper/ExchangeForToken.js' 
import { getUserProfile } from '../core/Shared/helper/UserProfile.js'
import type { AuthParams as GithubAuthParams } from '../core/Shared/AuthParams.types.js'

class GithubProvider extends BaseProviderClass {
    private clientId: string
    private clientSecret: string
    private redirectUrl: string
    private scope: string[]

    constructor({ clientId, clientSecret, redirecturl, scope} : GithubAuthParams) {
        super()
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUrl = redirecturl
        this.scope = scope
    }
    
    getAuthorizationUrl(): string {
        const uri = generateAuthUrl(this.clientId , this.redirectUrl as httpurl, this.scope , GithubConstants.Endpoint)
        return uri
    }
    async exchangeCodeForToken(code: string , key? : string): Promise<TokenResponse> {
        if(!key){
            throw new Error('Key is expected')
        }
        const response = await ExchangeCodeforToken(this.clientId , this.redirectUrl as httpurl , this.clientSecret , this.scope , code , key , GithubConstants.Endpoint)
        console.log(response);
        return response
    }
    async getUserProfile(accessToken: string): Promise<UserProfile> {
        const data = await getUserProfile(accessToken, GithubConstants.Endpoint , 'Github')
        console.log(data);        
        return data
    }
}

export {
    GithubProvider
}
