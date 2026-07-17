import { LinkedinProvider }  from '../linkedin/LinkedinProvider.js'
import { GoogleProvider } from '../google/GoogleProvider.js'
import { GithubProvider } from '../Github/GithubProviders.js'
import type { UniauthConfig } from './types/UniauthConfig.types.js'
import { BaseProviderClass } from "./BaseClass.js"
export class Uniauth {
    private providers = new Map<string, BaseProviderClass>()
    constructor(config: UniauthConfig) {
        if(config.providers?.Linkedin){
            this.providers.set(
                'Linkedin',
                new LinkedinProvider(config.providers.Linkedin)
            )
        }
        if(config.providers?.Google){
            this.providers.set(
                'Google',
                new GoogleProvider(config.providers.Google)
            )
        }
        if(config.providers?.Github){
            this.providers.set(
                'Github' ,
                new GithubProvider(config.providers.Github)
            )
        }
    }
    getProvider(providername: string){
        const provider = this.providers.get(providername)
        if(!provider){
            return 'Wrong provider call'
        }
        return provider
    }
}