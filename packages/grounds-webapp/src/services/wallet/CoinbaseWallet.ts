import { initializeConnector } from "@web3-react/core"
import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { Connection, ConnectionType } from "../../services/connection/Connections"
import { URLS } from "../network/chains"

export function buildCoinbaseWalletConnector() {
  const [coinbaseWallet, hooks] = initializeConnector<CoinbaseWallet>(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: URLS[1][0],
          appName: "grounds-dao",
        },
      }),
  )
  const coinbaseWalletConnection: Connection = {
    connector: coinbaseWallet,
    hooks: hooks,
    type: ConnectionType.COINBASE_WALLET,
  }

  return coinbaseWalletConnection
}
