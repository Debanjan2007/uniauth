import type { LinkedinAuthParams } from '../../linkedin/Linkedin.types.js'
import type { GoogleAuthParams } from '../../google/Google.types.js'
export interface UniauthConfig {
    providers : {
        Linkedin?: LinkedinAuthParams
        Google?: GoogleAuthParams
    }
}