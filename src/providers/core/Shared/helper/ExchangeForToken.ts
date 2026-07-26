import type { TokenResponse } from "../../types/TokenResponse.types.js"
import { getMemory } from '../../../../pkce/sessionManagement.js'
import type { httpurl } from "../AuthParams.types.js"
import axios from "axios"

const ExchangeCodeforToken = async (clientId: string , redirectUrl: httpurl  , clientsecret: string , scope: string[] , code: string , key: string , accessTokenUrl: string): Promise<TokenResponse>  => {
    const code_verifier = key ? getMemory(key) : undefined
        if (!code_verifier.value) {
            throw new Error('Session expired or invalid key')
        }
        try {
            const url = accessTokenUrl + '?' + new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                client_id: clientId,
                redirect_uri: redirectUrl,
                code_verifier: code_verifier.value,
                client_secret: clientsecret
            })

            const { data } = await axios.post<{ access_token: string; expires_in: number; refresh_token?: string; scope?: string; token_type: string; id_token?: string }>(
                url,
                undefined,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Accept": "application/json"
                    }
                }
            )
            console.log("Data is: ",data); 
            console.log("Data type is: ", typeof(data));                       
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
export {
    ExchangeCodeforToken
}