import { ReactNode } from "react"
import { ConnectionType } from "../../services/connection/Connections"

export type WalletContextType = {
  connectEagerly: () => Promise<void>
  currentConnectionType: ConnectionType | null
  setCurrentConnectionType: (connectionType: ConnectionType | null) => void
  disconnect: () => Promise<void>
}

export type WalletProviderProps = {
  children: ReactNode
}
