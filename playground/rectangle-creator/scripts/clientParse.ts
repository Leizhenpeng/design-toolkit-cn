import { log, warn } from './utils'

class ClientParser {
    client: string
    static instance: ClientParser
    availableClients = ['figma', 'masterGo', 'jsDesign']

    private constructor () {
      this.client = process.env.CLIENT_ENV || 'figma'
    }

    static getInstance () {
      if (!this.instance) {
        this.instance = new ClientParser()
      }
      return this.instance
    }

    get defaultClient () {
      return this.availableClients[0]
    }

    get formatClient () {
      const client = this.client
      const clientName = client.toLowerCase()
      const formatName = this.availableClients.find((item) => {
        return item.toLowerCase() === clientName
      })

      if (!formatName) {
        warn('client', `client ${client} is not available, use ${this.defaultClient} instead`)
        return this.defaultClient
      }

      log('client', `use ${formatName} client`)
      return formatName
    }
}
const aClientParser = ClientParser.getInstance()
const clientNow = aClientParser.formatClient

export default clientNow
