import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import tokens from "./tokens.json"

export interface Token {
  address: string
  chainId: number
  decimals: number
  name: string
  symbol: string
  logoURI: string
  tags: string[]
}

export interface QuoteResponse {
  inputMint: string
  outputMint: string
  inAmount: string
  outAmount: string
  otherAmountThreshold: string
  swapMode: string
  slippageBps: number
  platformFee: {
    amount: string
    feeBps: number
  }
  priceImpactPct: number
  routePlan: {
    swapInfo: {
      ammKey: string
      label: string
      inputMint: string
      outputMint: string
      inAmount: string
      outAmount: string
      feeAmount: string
      feeMint: string
    }
    percent: number
  }[]
  contextSlot: number
  timeTaken: number
}

const JUPITER_API_URL = "https://quote-api.jup.ag/v6"
// const  JUPITER_API_URL ="https://lite-api.jup.ag/swap/v1/swap"
// const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"
// const RPC_ENDPOINT = "https://api.devnet.solana.com"
const RPC_ENDPOINT ="https://serene-wispy-model.solana-mainnet.quiknode.pro/2ebdf944147ac60d02e7030145216e4e1681dd2c/"

export async function getTokens(): Promise<Token[]> {
  try {
    // Return tokens from our local JSON file
    return tokens.tokens
  } catch (error) {
    console.error("Error getting tokens:", error)
    throw error
  }
}

export async function getQuote(
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps: number = 50
): Promise<QuoteResponse> {
  try {
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount,
      slippageBps: slippageBps.toString(),
    })

    const response = await fetch(`${JUPITER_API_URL}/quote?${params}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error("Error getting quote:", error)
    throw error
  }
}

export async function getSwapTransaction(
  quote: QuoteResponse,
  userPublicKey: string
): Promise<{ swapTransaction: string }> {
  try {
    const response = await fetch(`${JUPITER_API_URL}/swap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse: quote,
        userPublicKey: userPublicKey,
        // wrapUnwrapSOL: true,
        dynsmicComputeUnitLimit: true,
        dynamicSlippage: true,
        prioritizationFeeLamports: {
          priorityLevelWithMaxLamports: {
            maxLamports: 1000000,
            priorityLevel: "veryHigh"
          }
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.error("Error getting swap transaction:", error)
    throw error
  }
}

export async function executeSwap(
  swapTransaction: string,
  connection: Connection,
  publicKey: PublicKey
): Promise<string> {
  const transaction = Transaction.from(Buffer.from(swapTransaction, "base64"))
  const signature = await connection.sendTransaction(transaction, [])
  await connection.confirmTransaction(signature)
  return signature
}

export function getConnection(network: WalletAdapterNetwork = WalletAdapterNetwork.Mainnet): Connection {
  return new Connection(
    network === WalletAdapterNetwork.Mainnet
      ? "https://api.mainnet-beta.solana.com"
      : "https://api.devnet.solana.com"
  )
} 