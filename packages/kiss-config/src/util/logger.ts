/* eslint-disable no-console */

import { resolve } from 'path'
import { bgBlue, bgYellow, black } from 'kolorist'

export const port = parseInt(process.env.PORT || '') || 3303
export const baseDir = process.cwd()
export const r = (...args: string[]) => resolve(baseDir, '.', ...args)
export const isDev = process.env.NODE_ENV === 'development'

// new line
console.log('')
export function log(name: string, message: string) {
  console.log(black(bgBlue(` ${name} `)), message)
}

export function warn(name: string, message: string) {
  console.log(black(bgYellow(` ${name} `)), message)
}
