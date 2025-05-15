"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWallet } from "@solana/wallet-adapter-react"
import { useToast } from "@/hooks/use-toast"
import { Connection, VersionedTransaction } from "@solana/web3.js"
import { getTokens, getQuote, getSwapTransaction, Token, QuoteResponse } from "@/lib/jupiter"
import Image from "next/image"

export default function SwapPage() {
  const router = useRouter()
  const { connected, publicKey, sendTransaction } = useWallet()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [tokens, setTokens] = useState<Token[]>([])
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [amount, setAmount] = useState("")
  const [quote, setQuote] = useState<QuoteResponse | null>(null)
  const [slippage, setSlippage] = useState(50)
  const [error, setError] = useState<string | null>(null)

  // Check wallet connection
  useEffect(() => {
    if (!connected || !publicKey) {
      router.push("/login")
    }
  }, [connected, publicKey, router])

  // Fetch tokens
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setError(null)
        const tokenList = await getTokens()
        
        // Sort tokens by popularity and name
        const sortedTokens = tokenList.sort((a, b) => {
          const popularTokens = ["SOL", "USDC", "USDT", "BONK"]
          const aIndex = popularTokens.indexOf(a.symbol)
          const bIndex = popularTokens.indexOf(b.symbol)
          
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
          if (aIndex !== -1) return -1
          if (bIndex !== -1) return 1
          return a.symbol.localeCompare(b.symbol)
        })

        setTokens(sortedTokens)
        
        // Set default tokens (SOL and USDC)
        const solToken = sortedTokens.find(token => token.symbol === "SOL")
        const usdcToken = sortedTokens.find(token => token.symbol === "USDC")
        if (solToken && usdcToken) {
          setFromToken(solToken)
          setToToken(usdcToken)
        }
      } catch (error: any) {
        console.error("Error fetching tokens:", error)
        setError(error.message || "Failed to fetch tokens")
        toast({
          title: "Error",
          description: "Failed to fetch tokens. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchTokens()
  }, [toast])

  // Get quote when amount or tokens change
  useEffect(() => {
    const getNewQuote = async () => {
      if (!fromToken || !toToken || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        setQuote(null)
        return
      }

      try {
        const amountInLamports = Math.floor(Number(amount) * Math.pow(10, fromToken.decimals))
        const quoteResponse = await getQuote(
          fromToken.address,
          toToken.address,
          amountInLamports.toString(),
          slippage
        )
        setQuote(quoteResponse)
      } catch (error) {
        console.error("Error getting quote:", error)
        setQuote(null)
      }
    }

    getNewQuote()
  }, [fromToken, toToken, amount, slippage])


  // const handleSwap = async () => {
  //   if (!publicKey || !quote) {
  //     toast({
  //       title: "Swap Error",
  //       description: "Wallet not connected or swap quote missing.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }
  
  //   try {
  //     setIsLoading(true);
  //     console.log("Starting swap...");
  
  //     // Fetch swap transaction
  //     const swapResponse = await getSwapTransaction(quote, publicKey.toString());
  //     if (!swapResponse?.swapTransaction) {
  //       throw new Error("Failed to get swap transaction");
  //     }
  
  //     const connection = new Connection("https://serene-wispy-model.solana-mainnet.quiknode.pro/2ebdf944147ac60d02e7030145216e4e1681dd2c/", "confirmed");
  //     const swapTransactionBuf = Buffer.from(swapResponse.swapTransaction, "base64");
  //     let transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  
  //     // Retry logic with blockhash refresh
  //     const MAX_RETRIES = 2;
  //     let signature: string;
      
  //     for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
  //       try {
  //         // Refresh blockhash for each attempt
  //         const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  //         transaction.message.recentBlockhash = blockhash;
  
  //         console.log(`Sending transaction attempt ${attempt + 1}`);
  //         signature = await sendTransaction(transaction, connection, {
  //           skipPreflight: false,
  //           preflightCommitment: "confirmed",
  //         });
  
  //         // Check if already confirmed before waiting
  //         const status = await connection.getSignatureStatus(signature);
  //         if (status.value?.confirmationStatus === "confirmed") {
  //           break;
  //         }
  
  //         // Wait for confirmation with longer timeout
  //         await connection.confirmTransaction({
  //           signature,
  //           blockhash,
  //           lastValidBlockHeight,
  //         }, "confirmed", ); // 120 seconds timeout
  
  //         break;
  //       } catch (error: any) {
  //         if (attempt === MAX_RETRIES - 1) throw error;
  //         console.log(`Attempt ${attempt + 1} failed, retrying...`);
  //       }
  //     }
  
  //     // Final confirmation check
  //     const result = await connection.getSignatureStatus(signature!);
  //     if (result.value?.err) {
  //       throw new Error("Transaction failed");
  //     }
  
  //     console.log("Swap confirmed successfully");
  //     toast({
  //       title: "Swap Successful",
  //       description: "Your tokens have been swapped!",
  //       variant: "default",
  //     });
  
  //     // Reset form state
  //     setAmount("");
  //     setQuote(null);
  
  //   } catch (error: any) {
  //     console.error("Swap error:", error);
      
  //     // Check if transaction actually succeeded
  //     if (error.signature) {
  //       const connection = new Connection("https://serene-wispy-model.solana-mainnet.quiknode.pro/2ebdf944147ac60d02e7030145216e4e1681dd2c/", "confirmed");
  //       const status = await connection.getSignatureStatus(error.signature);
  //       if (status.value?.confirmationStatus === "confirmed") {
  //         toast({
  //           title: "Swap Completed",
  //           description: "Transaction confirmed after initial timeout",
  //           variant: "default",
  //         });
  //         return;
  //       }
  //     }
  
  //     let errorMessage = "Swap failed. Please try again.";
  //     if (error.message.includes("Blockhash not found")) errorMessage = "Network delay - please retry";
  //     if (error.message.includes("user rejected")) errorMessage = "Transaction rejected by user";
  
  //     toast({
  //       title: "Swap Error",
  //       description: errorMessage,
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSwap = async () => {
    if (!publicKey || !quote) {
      toast({
        title: "Swap Error",
        description: "Wallet not connected or swap quote missing.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setIsLoading(true);
      console.log("Starting swap...");
  
      // Use a single connection instance
      const connection = new Connection(
        "https://holy-light-emerald.solana-mainnet.quiknode.pro/39d44556407db46e8f7f5731e3180703a1333c63/", 
        "confirmed"
      );
  
      // Initial transaction fetch
      let swapResponse = await getSwapTransaction(quote, publicKey.toString());
      if (!swapResponse?.swapTransaction) {
        throw new Error("Failed to get initial swap transaction");
      }
  
      const MAX_RETRIES = 3;
      let signature: string;
      let transaction: VersionedTransaction;
  
      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
          // Refresh swap transaction on each attempt
          if (attempt > 0) {
            swapResponse = await getSwapTransaction(quote, publicKey.toString());
            if (!swapResponse?.swapTransaction) {
              throw new Error(`Failed to get retry #${attempt} swap transaction`);
            }
          }
  
          // Deserialize fresh transaction
          const swapTransactionBuf = Buffer.from(swapResponse.swapTransaction, "base64");
          transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  
          // Get fresh blockhash for each attempt
          const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
          
          // Update transaction blockhash
          if (transaction.message.recentBlockhash !== blockhash) {
            transaction.message.recentBlockhash = blockhash;
          }
  
          console.log(`Sending transaction attempt ${attempt + 1}`);
          
          // Send transaction with proper options
          signature = await sendTransaction(transaction, connection, {
            skipPreflight: false,
            preflightCommitment: "confirmed",
            maxRetries: 2,
          });
  
          // Wait for confirmation with aggressive timeout
          const confirmation = await connection.confirmTransaction({
            signature,
            lastValidBlockHeight,
            blockhash,
          }, "confirmed");
  
          if (confirmation.value.err) {
            throw new Error("Transaction failed confirmation");
          }
  
          console.log("Swap confirmed successfully");
          break;
  
        } catch (error: any) {
          if (attempt === MAX_RETRIES - 1) {
            throw new Error(`Final attempt failed: ${error.message}`);
          }
          
          console.warn(`Attempt ${attempt + 1} failed:`, error);
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      }
  
      // Verify final confirmation
      const result = await connection.getSignatureStatus(signature!);
      if (result.value?.err) {
        throw new Error("Transaction failed final verification");
      }
  
      toast({
        title: "Swap Successful",
        description: "Your tokens have been swapped!",
        variant: "default",
      });
  
      // Reset form state
      setAmount("");
      setQuote(null);
  
    } catch (error: any) {
      console.error("Swap error:", error);
      
      // Handle specific error cases
      let errorMessage = "Swap failed. Please try again.";
      if (error.message.includes("user rejected")) {
        errorMessage = "Transaction rejected by user";
      } else if (error.message.includes("Blockhash not found")) {
        errorMessage = "Network timeout - please try again";
      } else if (error.message.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction";
      }
  
      toast({
        title: "Swap Error",
        description: errorMessage,
        variant: "destructive",
      });
  
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return (
    <div className="container flex min-h-screen flex-col py-8 bg-background text-foreground">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button variant="outline" onClick={() => setQuote(null)}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Quote
        </Button>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Swap Tokens</CardTitle>
          <CardDescription> Swap your tokens for USDC, USDT, or SOL</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex items-center gap-2">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={fromToken?.address}
                    onChange={(e) => {
                      const token = tokens.find(t => t.address === e.target.value)
                      setFromToken(token || null)
                      setQuote(null)
                    }}
                  >
                    <option value="">Select token</option>
                    {tokens.map((token) => (
                      <option key={token.address} value={token.address}>
                        {token.symbol} - {token.name}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                {fromToken && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Image
                      src={fromToken.logoURI}
                      alt={fromToken.symbol}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <span>{fromToken.symbol}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const temp = fromToken
                    setFromToken(toToken)
                    setToToken(temp)
                    setQuote(null)
                  }}
                >
                  <RefreshCw className="h-6 w-6" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex items-center gap-2">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={toToken?.address}
                    onChange={(e) => {
                      const token = tokens.find(t => t.address === e.target.value)
                      setToToken(token || null)
                      setQuote(null)
                    }}
                  >
                    <option value="">Select token</option>
                    {tokens.map((token) => (
                      <option key={token.address} value={token.address}>
                        {token.symbol} - {token.name}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="text"
                    placeholder="0.00"
                    className="w-full"
                    readOnly
                    value={quote ? (Number(quote.outAmount) / Math.pow(10, toToken?.decimals || 0)).toFixed(6) : ""}
                  />
                </div>
                {toToken && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Image
                      src={toToken.logoURI}
                      alt={toToken.symbol}
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <span>{toToken.symbol}</span>
                  </div>
                )}
              </div>

              {quote && (
                <div className="rounded-lg bg-secondary/10 p-4">
                  <div className="flex justify-between text-sm">
                    <span>Network Fee</span>
                    <span>0.5%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Minimum Received</span>
                    <span>
                      {(Number(quote.otherAmountThreshold) / Math.pow(10, toToken?.decimals || 0)).toFixed(6)}{" "}
                      {toToken?.symbol}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Slippage Tolerance</Label>
                <div className="flex gap-2">
                  <Button
                    variant={slippage === 50 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSlippage(50)}
                  >
                    0.5%
                  </Button>
                  <Button
                    variant={slippage === 100 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSlippage(100)}
                  >
                    1%
                  </Button>
                  <Button
                    variant={slippage === 200 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSlippage(200)}
                  >
                    2%
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSwap}
            disabled={isLoading || !quote || !amount || !fromToken || !toToken || !!error}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Swapping...
              </>
            ) : (
              "Swap"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
function setConvertFrom(arg0: string) {
  throw new Error("Function not implemented.")
}

