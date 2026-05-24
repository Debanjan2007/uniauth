import type { AuthParams } from '../Shared/AuthParams.types.js'

/**
 * Configuration object for initializing the Uniauth client.
 */
export interface UniauthConfig {
    providers : {
        Linkedin?: AuthParams
        Google?: AuthParams
        Github?: AuthParams
    }
}