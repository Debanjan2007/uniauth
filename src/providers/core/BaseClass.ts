import type { TokenResponse } from "./types/TokenResponse.types";
import type { UserProfile } from "./types/UserProfile.types";

abstract class BaseProviderClass{
    abstract getAuthorizationUrl():string ;
    abstract exchangeCodeForToken(code: string): Promise<TokenResponse> ;
    abstract getUserProfile(): Promise<UserProfile>
}