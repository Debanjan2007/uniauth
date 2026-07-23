import axios from "axios";
import type { httpurl } from "../AuthParams.types.js";
import type { TokenRefresh } from "../../types/RefreshToken.types.js"

async function refreshToken(refreshtoken: string, clientId: string, clientSecret: string, URI: httpurl): Promise<TokenRefresh> {
    try {
        const payload = {
            grant_type: 'refresh_token',
            refresh_token: refreshtoken,
            client_id: clientId,
            client_secret: clientSecret
        }
        const TokenRes = await axios.post<TokenRefresh>(
            URI,
            new URLSearchParams(payload),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )
        return TokenRes.data
    } catch (error) {
        throw new Error("Error occured while refreshing the access token", { cause: error })
    }
}

export {
    refreshToken
}