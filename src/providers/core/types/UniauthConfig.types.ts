import type { LinkedinAuthParams } from '../../linkedin/Linkedin.types'

export interface UniauthConfig {
    providers : {
        Linkedin: LinkedinAuthParams
    }
}