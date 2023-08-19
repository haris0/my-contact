import type { publicRuntimeConfig, serverRuntimeConfig } from './app.config';

declare module 'next/config' {
  export type PublicConfig = typeof publicRuntimeConfig;

  export type ServerConfig = typeof serverRuntimeConfig;

  type NextConfig = {
    publicRuntimeConfig: PublicConfig;
    serverRuntimeConfig: ServerConfig;
  };

  declare const _default: () => NextConfig;
  export declare function setConfig(configValue: NextConfig): void;

  export = _default;
}
