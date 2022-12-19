/* eslint-disable @typescript-eslint/no-unused-vars */
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export default createUnplugin<Options>(options => ({
  name: 'unplugin-kiss-config',

}))
