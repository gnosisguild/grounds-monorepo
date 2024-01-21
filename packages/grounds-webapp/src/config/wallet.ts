// Sets if the example should run locally or on chain
export enum Chain {
  POLYGON,
  MAINNET,
}

// Inputs that configure this example to run
interface ChainConfig {
  chain: Chain
  rpc: {
    polygon: string
    mainnet: string
  }
}

//Chain Configuration
export const CurrentConfig: ChainConfig = {
  chain: Chain.MAINNET,
  rpc: {
    polygon: "",
    mainnet: "https://mainnet.infura.io/v3/4bf032f2d38a4ed6bb975b80d6340847",
  },
}
