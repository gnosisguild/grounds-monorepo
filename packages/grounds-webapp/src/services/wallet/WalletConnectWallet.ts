import { initializeConnector } from "@web3-react/core"
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2"
import { Connection, ConnectionType } from "../connection/Connections"
import { MAINNET_CHAINS } from "../network/chains"

const [mainnet, ...optionalChains] = Object.keys(MAINNET_CHAINS).map(Number)

export function buildWalletConnectConnector() {
  const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: "1a1b74c2fbf55e4ef414490f0752d331",
          chains: [mainnet],
          optionalChains,
          showQrModal: true,
        },
      }),
  )
  const walletConnectConnection: Connection = {
    connector: web3WalletConnect,
    hooks: web3WalletConnectHooks,
    type: ConnectionType.WALLET_CONNECT,
  }
  return walletConnectConnection
}
