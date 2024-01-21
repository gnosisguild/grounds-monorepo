import React, { useState } from "react"

import { WalletContextType, WalletProviderProps } from "./Wallet.types"
import { createGenericContext } from "../../utils/create-generic-context"
import { Web3ReactProvider } from "@web3-react/core"
import {
  ConnectionType,
  getConnection,
  PRIORITIZED_CONNECTORS,
  tryDeactivateConnector,
} from "../../services/connection/Connections"
import { Connector } from "@web3-react/types"
const [useWalletContext, WalletContextProvider] = createGenericContext<WalletContextType>()

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [currentConnectionType, setCurrentConnectionType] = useState<ConnectionType | null>(null)
  async function connect(connector: Connector) {
    try {
      if (connector.connectEagerly) {
        await connector.connectEagerly()
      } else {
        await connector.activate()
      }
    } catch (error) {
      console.debug(`web3-react eager connection error: ${error}`)
    }
  }

  const disconnect = async () => {
    if (currentConnectionType === null) return
    const deactivation = await tryDeactivateConnector(getConnection(currentConnectionType).connector)
    if (deactivation === undefined) {
      return // Handle error
    }
  }

  const connectEagerly = async () => {
    await connect(getConnection(ConnectionType.NETWORK).connector)
    await connect(getConnection(ConnectionType.GNOSIS_SAFE).connector)
  }

  return (
    <Web3ReactProvider
      connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [connector.connector, connector.hooks])}
    >
      <WalletContextProvider value={{ connectEagerly, currentConnectionType, setCurrentConnectionType, disconnect }}>
        {children}
      </WalletContextProvider>
    </Web3ReactProvider>
  )
}
export { useWalletContext, WalletProvider }
