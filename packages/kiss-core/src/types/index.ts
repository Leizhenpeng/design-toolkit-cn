import type { masterGoClinet } from './client/masterGo'
import type { figmaClient } from './client/figma'
import type { jsDesignClient } from './client/jsDesign'
// declare namespace Models {
//   export import Mg = masterGo
//   export import Figma = figma
// }import { expect } from 'vitest';

// export { Models }

// declare global {
//   const mg: any
//   // const figma: any
//   // const jsDesign: any
// }

export type Platform = 'figma' | 'mg' | 'jsDesign' | 'unknown' | 'ui'
export enum PlatformEnum {
  figma,
  mg,
  jsDesign,
}

export enum UiClientEnum {
  figma,
  mg,
  jsDesign,
  unknown,
}

export interface IClientCopy {
  figma: figmaClient.PluginAPI
  mg: masterGoClinet.PluginAPI
  jsDesign: jsDesignClient.PluginAPI
}

export interface IClient extends IClientCopy {
  [key: string]: any
}
