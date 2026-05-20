import type { LinkedinAuthParams } from '../../linkedin/Linkedin.types.js'
import type { GoogleAuthParams } from '../../google/Google.types.js'

/**
 * Configuration object for initializing the Uniauth client.
 */
export interface UniauthConfig {
    providers : {
        Linkedin?: LinkedinAuthParams
        Google?: GoogleAuthParams
    }
}