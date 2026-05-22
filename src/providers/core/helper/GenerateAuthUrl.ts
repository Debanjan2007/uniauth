import { generateUniqueid } from '../../../utils/UniqueKeyGenerate.js'
import { generateCodeChallenge } from '../../../pkce/generateCodeChallenge.js'
import { generateCodeVerifier } from '../../../pkce/generateCodeVerifier.js'
import { useMemory } from '../../../pkce/sessionManagement.js'
import { GoogleConstants } from '../../google/Google.constants.js'
import type { httpurl } from '../../google/Google.types.js'

const generateAuthUrl = (clientId: string , redirectUrl: httpurl , scope: string[]):string => {
    const key : string = generateUniqueid()
            const code_verifier : string = generateCodeVerifier()
            useMemory({key , value: code_verifier , ttl: 60000})
            const code_challenge = generateCodeChallenge(code_verifier)
            const state = generateUniqueid()
            const param =  new URLSearchParams({
                client_id: clientId ,
                redirect_uri: redirectUrl ,
                response_type: 'code',
                state: state,
                scope: scope.join(" "),
                code_challenge: code_challenge,
                code_challenge_method: 'S256', 
                key: key
            })
            const url = GoogleConstants.AuthUrl + '?' +
                param.toString().replace(/\+/g, "%20")   
            return url
}

export {
    generateAuthUrl
}