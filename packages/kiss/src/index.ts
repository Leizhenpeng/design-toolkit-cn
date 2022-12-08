// test add
import { Kiss } from '~/kiss'

export function add(a: number, b: number): number {
  return a + b + 12
}

const kiss = new Kiss().initClient()

const kiss_me = Object.create(kiss || {} as any) as any
export {
  kiss,
  kiss_me,
}
