/**
 * Public entry point for the Uniauth client library.
 *
 * Re-exports the main `Uniauth` class as both a named and default export,
 * and exposes the bundled provider implementations, utility helpers, and shared types.
 */

/**
 * Primary Uniauth client class for configuring and executing OAuth authentication flows.
 * Re-exported from `./providers/core/Uniauth.js`.
 */
export { Uniauth } from './providers/core/Uniauth.js'

/**
 * Default export alias for the `Uniauth` client.
 */
export { Uniauth as default } from './providers/core/Uniauth.js'

/**
 * Re-export utility helpers for extracting keys and supporting public SDK helpers.
 */
export * from './utils/ExtractKey.js'

/**
 * Re-export shared public type definitions used by Uniauth consumers.
 */
export * from './index.types.js'

/**
 * Re-export the Google provider implementation and its associated public types.
 */
export * from './providers/google/GoogleProvider.js'

/**
 * Re-export the Linkedin provider implementation and its associated public types.
 */
export * from './providers/linkedin/LinkedinProvider.js'