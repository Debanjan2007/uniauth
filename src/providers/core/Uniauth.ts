import { LinkedinProvider } from '../linkedin/LinkedinProvider.js'
import { GoogleProvider } from '../google/GoogleProvider.js'
import { GithubProvider } from '../Github/GithubProviders.js'
// import { InstagramProvider } from '../instagram/InstagramProvide.js'
import type { UniauthConfig } from './types/UniauthConfig.types.js'
import { BaseProviderClass } from "./BaseClass.js"
import { InstagramProvider } from '../instagram/InstagramProvider.js'
/**
 * The main entry point for the Uniauth library.
 * Manages configuration and instantiation of various OAuth providers.
 * 
 * @example
 * ```typescript
 * const uniauth = new Uniauth({
 *   providers: {
 *     google: { clientId: '...', clientSecret: '...', redirecturl: 'http://...', scope: ['profile'] }
 *   }
 * });
 * const google = uniauth.getProvider('google');
 * ```
 */
export class Uniauth {
    private providers = new Map<string, BaseProviderClass>()

    /**
     * Initializes the Uniauth instance and configures the specified providers.
     * @param {UniauthConfig} config - The configuration object containing provider credentials.
     */
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
        if (config.providers?.instagram) {
            this.providers.set(
                'instagram',
                new InstagramProvider(config.providers.instagram)
            )
        }       
    }

    /**
     * Retrieves an initialized provider instance by its name.
     * @template T The expected type of the returned provider (extends BaseProviderClass).
     * @param {string} providerName - The name of the provider (e.g., 'google', 'linkedin', 'github'). Case-insensitive.
     * @returns {T} The configured provider instance.
     * @throws {Error} If the requested provider was not configured or is unknown.
     * 
     * @example
     * ```typescript
     * const googleProvider = uniauth.getProvider<GoogleProvider>('google');
     * ```
     */
    getProvider<T extends BaseProviderClass>(providerName: string): T {
        const provider = this.providers.get(providerName.toLowerCase());

        if (!provider) {
            throw new Error(`Unknown provider: ${providerName}`);
        }

        return provider as T;
    }
}