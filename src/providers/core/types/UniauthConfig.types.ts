import type { AuthParams } from '../Shared/AuthParams.types.js'

/**
 * Configuration object for initializing the Uniauth client.
 */
export interface UniauthConfig {
    providers : {
        linkedin?: AuthParams
        google?: AuthParams
        github?: AuthParams
    }
}