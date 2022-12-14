import rimraf from 'rimraf'
import { r } from './common'

const clearClientTypesDir = async () => {
  // delete all files in src/types/client
  const path = r('types', 'client/**')
  rimraf.sync(path)
}

clearClientTypesDir()
