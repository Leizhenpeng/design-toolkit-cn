// test add
import { Kiss } from '~/kiss'

export function add(a: number, b: number): number {
  return a + b + 12
}

const kiss = new Kiss()
const _client = kiss.inUi ? {} : kiss.client
const client = Object.create(_client)
client.prototype = client

export {
  kiss,
  client,
}
