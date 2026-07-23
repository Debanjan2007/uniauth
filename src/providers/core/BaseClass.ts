import type { TokenResponse } from "./types/TokenResponse.types.js";
import type { UserProfile } from "./types/UserProfile.types.js";

export abstract class BaseProviderClass{
    abstract getAuthorizationUrl():string ;
    abstract exchangeCodeForToken(code: string): Promise<TokenResponse> ;
    abstract getUserProfile(accessToken: string): Promise<UserProfile> ;
    refreshAccessToken?(refreshToken: string): Promise<unknown> ;
}