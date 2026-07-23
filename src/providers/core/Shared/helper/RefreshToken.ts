import axios from "axios";
import type { httpurl } from "../AuthParams.types.js";

async function refreshToken(refreshtoken: string, clientId: string, clientSecret: string, URI: httpurl): Promise<unknown> {
    try {
        const payload = {
            grant_type: 'refresh_token',
            refresh_token: refreshtoken,
            client_id: clientId,
            client_secret: clientSecret
        }
        const TokenRes = await axios.post(
            URI,
            new URLSearchParams(payload),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )
        console.log(TokenRes);
        return TokenRes
    } catch (error) {
        throw new Error("Error occured while refreshing the access token", { cause: error })
    }
}

export {
    refreshToken
}