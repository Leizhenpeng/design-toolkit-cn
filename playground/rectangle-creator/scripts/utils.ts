import { bgBlue, bgYellow, black } from 'kolorist'
import { resolve } from 'path'

export const port = parseInt(process.env.PORT || '') || 3303
export const r = (...args: string[]) => resolve(__dirname, '..', ...args)
export const isDev = process.env.NODE_ENV === 'development'

// new line
console.log('')
export function log (name: string, message: string) {
  console.log(black(bgBlue(` ${name} `)), message)
}

export function warn (name: string, message: string) {
  console.log(black(bgYellow(` ${name} `)), message)
}
