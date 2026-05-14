import type { LinkedinAuthParams } from '../../linkedin/Linkedin.types.js'

export interface UniauthConfig {
    providers : {
        Linkedin: LinkedinAuthParams
    }
}