import * as services from './services'
import { Store } from './store'
export { routes } from './routes'

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key])

export const providers = [
  Store,
  ...mapValuesToArray(services)
]
