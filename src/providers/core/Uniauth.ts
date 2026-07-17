import { LinkedinProvider } from '../linkedin/LinkedinProvider.js'
import { GoogleProvider } from '../google/GoogleProvider.js'
import { GithubProvider } from '../Github/GithubProviders.js'
import type { UniauthConfig } from './types/UniauthConfig.types.js'
import { BaseProviderClass } from "./BaseClass.js"
export class Uniauth {
    private providers = new Map<string, BaseProviderClass>()
    constructor(config: UniauthConfig) {
        if (config.providers?.linkedin) {
            this.providers.set(
                'linkedin',
                new LinkedinProvider(config.providers.linkedin)
            )
        }
        if (config.providers?.google) {
            this.providers.set(
                'google',
                new GoogleProvider(config.providers.google)
            )
        }
        if (config.providers?.github) {
            this.providers.set(
                'github',
                new GithubProvider(config.providers.github)
            )
        }
    }
    getProvider<T extends BaseProviderClass>(providerName: string): T {
        const provider = this.providers.get(providerName.toLowerCase());

        if (!provider) {
            throw new Error(`Unknown provider: ${providerName}`);
        }

        return provider as T;
    }
}