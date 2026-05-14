import type { TokenResponse } from "./core/types/TokenResponse.types.js";
import type { UserProfile } from "./core/types/UserProfile.types.js";

export abstract class BaseProviderClass{
    abstract getAuthorizationUrl():string ;
    abstract exchangeCodeForToken(code: string): Promise<TokenResponse> ;
    abstract getUserProfile(accessToken: string): Promise<UserProfile>
}