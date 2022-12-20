import { ref } from 'vue'
import { log, warn } from './logger'

class ClientParser {
  client: string
  static instance: ClientParser
  availableClients = ['figma', 'masterGo', 'jsDesign']

  private constructor(client: string) {
    this.client = client || 'figma'
  }

  static initInstance(client: string) {
    this.instance = new ClientParser(client)
  }

  static getInstance() {
    return this.instance
  }

  get defaultClient() {
    return this.availableClients[0]
  }

  get formatClient() {
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

export default ClientParser

export const clientParse = ref('figma')

export const setClient = (client: string) => {
  ClientParser.initInstance(client)
  clientParse.value = ClientParser.getInstance().formatClient
}
