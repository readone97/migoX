// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { useWallet, useConnection } from "@solana/wallet-adapter-react"
// import { Transaction } from "@solana/web3.js"
// import type { Token } from "@/types"

// interface QuoteResponse {
//   inAmount: string
//   outAmount: string
//   priceImpactPct: number
//   marketInfos: any[]
//   routePlan: any[]
//   slippageBps: number
//   otherAmountThreshold: string
//   swapMode: string
// }

// interface SwapParams {
//   inputToken: Token | null
//   outputToken: Token | null
//   inputAmount: string
//   slippage: number
// }

// type SwapStatus = "idle" | "loading" | "success" | "error"

// export const useSwap = ({ inputToken, outputToken, inputAmount, slippage }: SwapParams) => {
//   const { connection } = useConnection()
//   const { publicKey, signTransaction } = useWallet()

//   const [quote, setQuote] = useState<QuoteResponse | null>(null)
//   const [quoteLoading, setQuoteLoading] = useState<boolean>(false)
//   const [quoteError, setQuoteError] = useState<string | null>(null)

//   const [swapStatus, setSwapStatus] = useState<SwapStatus>("idle")
//   const [swapError, setSwapError] = useState<string | null>(null)

//   // Fetch quote when inputs change
//   useEffect(() => {
//     const fetchQuote = async () => {
//       // Reset states
//       setQuote(null)
//       setQuoteError(null)

//       // Validate inputs
//       if (!inputToken || !outputToken || !inputAmount || Number(inputAmount) <= 0) {
//         return
//       }

//       try {
//         setQuoteLoading(true)

//         const params = new URLSearchParams({
//           inputMint: inputToken.address,
//           outputMint: outputToken.address,
//           amount: (Number(inputAmount) * 10 ** (inputToken.decimals || 6)).toString(),
//           slippageBps: (slippage * 100).toString(), // Convert percentage to basis points
//         })

//         const response = await fetch(`https://quote-api.jup.ag/v6/quote?${params.toString()}`)

//         if (!response.ok) {
//           throw new Error(`Failed to fetch quote: ${response.status}`)
//         }

//         const data = await response.json()

//         // Format outAmount to be human-readable
//         data.outAmount = (Number(data.outAmount) / 10 ** (outputToken.decimals || 6)).toFixed(outputToken.decimals || 6)

//         setQuote(data)
//       } catch (err) {
//         console.error("Error fetching quote:", err)
//         setQuoteError(err instanceof Error ? err.message : "Failed to fetch quote")
//       } finally {
//         setQuoteLoading(false)
//       }
//     }

//     fetchQuote()
//   }, [inputToken, outputToken, inputAmount, slippage])

//   // Execute swap
//   const swap = useCallback(async () => {
//     if (!publicKey || !signTransaction || !quote || !inputToken || !outputToken) {
//       return
//     }

//     try {
//       setSwapStatus("loading")
//       setSwapError(null)

//       // 1. Get serialized transactions for the swap
//       const params = new URLSearchParams({
//         quoteResponse: JSON.stringify(quote),
//         userPublicKey: publicKey.toString(),
//       })

//       const swapResponse = await fetch(`https://quote-api.jup.ag/v6/swap?${params.toString()}`)

//       if (!swapResponse.ok) {
//         throw new Error(`Failed to prepare swap: ${swapResponse.status}`)
//       }

//       const swapData = await swapResponse.json()

//       // 2. Deserialize the transaction
//       const swapTransaction = Transaction.from(Buffer.from(swapData.swapTransaction, "base64"))

//       // 3. Sign the transaction
//       const signedTransaction = await signTransaction(swapTransaction)

//       // 4. Execute the transaction
//       const rawTransaction = signedTransaction.serialize()
//       const txid = await connection.sendRawTransaction(rawTransaction, {
//         skipPreflight: true,
//         maxRetries: 2,
//       })

//       // 5. Wait for confirmation
//       await connection.confirmTransaction(txid)

//       setSwapStatus("success")
//     } catch (err) {
//       console.error("Error executing swap:", err)
//       setSwapError(err instanceof Error ? err.message : "Failed to execute swap")
//       setSwapStatus("error")
//     }
//   }, [publicKey, signTransaction, quote, connection, inputToken, outputToken])

//   // Reset swap state
//   const resetSwap = useCallback(() => {
//     setSwapStatus("idle")
//     setSwapError(null)
//   }, [])

//   return {
//     quote,
//     quoteLoading,
//     quoteError,
//     swap,
//     swapStatus,
//     swapError,
//     resetSwap,
//   }
// }


import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'
import { toast } from '@/components/ui/use-toast'
import Jupiter, { RouteInfo } from '@jup-ag/core'
import { TokenInfo } from '@solana/spl-token-registry'

export const useSwap = () => {
  const { connection } = useConnection()
  const { publicKey, connected, signAllTransactions } = useWallet()

  const handleSwap = async (
    fromToken: TokenInfo,
    toToken: TokenInfo,
    fromAmount: string
  ) => {
    if (!connected || !publicKey) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to swap tokens.',
        variant: 'destructive',
      })
      return
    }

    if (!fromAmount || Number(fromAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to swap.',
        variant: 'destructive',
      })
      return
    }

    try {
      // Initialize Jupiter
      const jupiter = await Jupiter.load({
        connection,
        cluster: 'mainnet-beta',
        user: publicKey,
      })

      // Get routes
      const routes = await jupiter.computeRoutes({
        inputMint: new PublicKey(fromToken.address),
        outputMint: new PublicKey(toToken.address),
        inputAmount: Number(fromAmount) * 10 ** fromToken.decimals,
        slippage: 1, // 1% slippage
      })

      if (!routes?.routesInfos?.[0]) {
        throw new Error('No routes found for this swap')
      }

      // Prepare swap transaction
      const { swapTransaction } = await jupiter.exchange({
        routeInfo: routes.routesInfos[0],
      })

      // Send transaction
      const rawTransaction = swapTransaction.serialize()
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: false,
      })

      // Confirm transaction
      await connection.confirmTransaction(txid, 'confirmed')

      // Update UI with new balances
      const updatedBalances = await fetchTokenBalances(publicKey, connection)
      
      toast({
        title: 'Swap successful!',
        description: `Swapped ${fromAmount} ${fromToken.symbol} to ${toToken.symbol}`,
      })

      return {
        txid,
        newBalance: updatedBalances.get(toToken.address) || 0
      }

    } catch (error) {
      console.error('Swap error:', error)
      toast({
        title: 'Swap failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      })
      throw error
    }
  }

  // Function to fetch token balances
  const fetchTokenBalances = async (wallet: PublicKey, conn: Connection) => {
    const balances = new Map<string, number>()
    
    // Fetch SOL balance
    const solBalance = await conn.getBalance(wallet)
    balances.set('SOL', solBalance / 10 ** 9)

    // Fetch SPL tokens
    const tokenAccounts = await conn.getParsedTokenAccountsByOwner(wallet, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    })

    tokenAccounts.value.forEach(({ account }) => {
      const tokenInfo = account.data.parsed.info
      const balance = tokenInfo.tokenAmount.uiAmount
      if (balance > 0) {
        balances.set(tokenInfo.mint, balance)
      }
    })

    return balances
  }

  return { handleSwap, fetchTokenBalances }
}
