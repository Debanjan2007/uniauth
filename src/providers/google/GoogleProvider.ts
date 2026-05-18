import { BaseProviderClass } from '../BaseClass.js'
import { TokenResponse } from '../core/types/TokenResponse.types.js';
import type { GoogleAuthParams } from './Google.types.js'
import { generateCodeChallenge } from '../../pkce/generateCodeChallenge.js'
import { generateCodeVerifier } from '../../pkce/generateCodeVerifier.js'
import { useMemory } from '../../pkce/sessionManagement.js'
import { generateUniqueid } from '../../utils/UniqueKeyGenerate.js'
import { GoogleConstants } from './Google.constants.js'
import { UserProfile } from '../core/types/UserProfile.types.js';
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
        const url = GoogleConstants.AuthUrl + '?' + new URLSearchParams({
            client_id: this.clientId ,
            redirect_uri: this.redirectUrl ,
            response_type: 'code',
            state: state,
            scope: this.scope.join(),
            code_challenge: code_challenge,
            code_challenge_method: 'S256',
            key: key
        })
        return url
    }
    exchangeCodeForToke n(code: string): Promise<TokenResponse> {  
    }
    getUserProfile(accessToken: string): Promise<UserProfile> {
    }
}