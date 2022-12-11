import type { masterGo } from './mg'
import type { figma } from './figma'
import type { jsDesign } from './jsDesign'

// declare namespace Models {
//   export import Mg = masterGo
//   export import Figma = figma
// }import { expect } from 'vitest';

// export { Models }

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
  figma: figma.PluginAPI
  mg: masterGo.PluginAPI
  jsDesign: jsDesign.PluginAPI
}

export interface IClient extends IClientCopy {
  [key: string]: any
}
