import type { masterGoClinet } from './client/masterGo'
import type { figmaClient } from './client/figma'
import type { jsDesignClient } from './client/jsDesign'

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

declare global {
  const figma: figmaClient.PluginAPI
  const jsDesign: jsDesignClient.PluginAPI
  const mg: masterGoClinet.PluginAPI
  const __html__: string
  const __uiFiles__: {
    [key: string]: string
  }
}

export * from '../types/client/masterGo.d'
export * from '../types/client/figma.d'
export * from '../types/client/jsDesign.d'

