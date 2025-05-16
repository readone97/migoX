export interface Token {
    address: string
    chainId: number
    decimals: number
    name: string
    symbol: string
    logoURI?: string
    tags?: string[]
    extensions?: Record<string, any>
    coingeckoScore?: number
  }
  