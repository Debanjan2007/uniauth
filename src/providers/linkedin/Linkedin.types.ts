import type { httpurl } from '../google/Google.types.js'

/**
 * OAuth configuration parameters required to authenticate with LinkedIn.
 */
export interface LinkedinAuthParams {
    clientId: string,
    redirecturl: httpurl,
    clientSecret: string,
    scope: string[]
}