import type { AuthParams } from '../Shared/AuthParams.types.js'

/**
 * Configuration object for initializing the Uniauth client.
 */
export interface UniauthConfig {
    /** Configuration for individual OAuth providers. Keys must be lowercase. */
    providers : {
        /** Authentication parameters for the LinkedIn provider. */
        linkedin?: AuthParams
        /** Authentication parameters for the Google provider. */
        google?: AuthParams
        /** Authentication parameters for the GitHub provider. */
        github?: AuthParams
        /** Authentication parameters for the Instagram provider. */
        instagram?: AuthParams
    }
}