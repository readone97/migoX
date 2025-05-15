
"use client"

import  React from "react"

import { useState, useEffect, useCallback } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { WalletConnectButton } from "./wallet-conect-button"
import { TokenSelector } from "@/components/token-selector"
import { SwapSettings } from "@/components/swap-settings"
import { useTokenList } from "@/hooks/use-token-list"
import { useSwap } from "@/hooks/use-swap"
import { ArrowDown, AlertCircle, RefreshCw, Settings } from "lucide-react"
import  { Token } from "@/types"
import { ThemeToggle } from "@/components/theme-toggle"

export const SwapInterface = () => {
  const { connected } = useWallet()
  const { tokens, loading: tokensLoading } = useTokenList()

  const [inputAmount, setInputAmount] = useState(" ")
  const [slippage, setSlippage] = useState(1) // 1%
  const [showSettings, setShowSettings] = useState(false)

  const [inputToken, setInputToken] = useState(null)
  const [outputToken, setOutputToken] = useState(null)

  const { quote, quoteLoading, quoteError, swap, swapStatus, swapError, resetSwap } = useSwap({
    inputToken,
    outputToken,
    inputAmount,
    slippage,
  })

  // Set default tokens when token list loads
  useEffect(() => {
    if (tokens.length > 0 && !inputToken && !outputToken) {
      // Find USDC and SOL as defaults
      const usdc = tokens.find((t) => t.symbol === "USDC")
      const sol = tokens.find((t) => t.symbol === "SOL")

      if (usdc) setInputToken(usdc)
      if (sol) setOutputToken(sol)
    }
  }, [tokens, inputToken, outputToken])

  // Swap tokens
  const handleSwapTokens = useCallback(() => {
    setInputToken(outputToken)
    setOutputToken(inputToken)
    setInputAmount("")
  }, [inputToken, outputToken])

  // Handle input amount change
  const handleInputChange = (e) => {
    const value = e.target.value
    // Only allow numbers and decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setInputAmount(value)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Swap</CardTitle>
          <CardDescription>Trade tokens instantly</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <WalletConnectButton />
        </div>
      </CardHeader>

      {showSettings && (
        <div className="px-6 pb-4">
          <SwapSettings slippage={slippage} onSlippageChange={setSlippage} onClose={() => setShowSettings(false)} />
        </div>
      )}

      <CardContent className="space-y-4">
        {!connected && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet not connected</AlertTitle>
            <AlertDescription>Please connect your wallet to start swapping.</AlertDescription>
          </Alert>
        )}

        {/* Input token */}
        <div className="rounded-lg border p-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-muted-foreground">You pay</div>
            {inputToken && <div className="text-sm text-muted-foreground">Balance: {inputToken.symbol}</div>}
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="0.00"
              value={inputAmount}
              onChange={handleInputChange}
              className="border-0 text-2xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={!connected}
            />

            <TokenSelector
              selectedToken={inputToken}
              onSelectToken={setInputToken}
              tokens={tokens}
              loading={tokensLoading}
              disabled={!connected}
            />
          </div>
        </div>

        {/* Swap direction button */}
        <div className="flex justify-center -my-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-background z-10"
            onClick={handleSwapTokens}
            disabled={!connected}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Output token */}
        <div className="rounded-lg border p-4">
          <div className="flex justify-between mb-2">
            <div className="text-sm text-muted-foreground">You receive</div>
            {outputToken && <div className="text-sm text-muted-foreground">Balance: {outputToken.symbol}</div>}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              {quoteLoading ? (
                <Skeleton className="h-9 w-24" />
              ) : (
                <div className="text-2xl">{quote ? quote.outAmount : "0.00"}</div>
              )}
            </div>

            <TokenSelector
              selectedToken={outputToken}
              onSelectToken={setOutputToken}
              tokens={tokens}
              loading={tokensLoading}
              disabled={!connected}
            />
          </div>
        </div>

        {/* Quote details */}
        {quote && !quoteError && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span>
                1 {inputToken?.symbol} ≈ {(Number(quote.outAmount) / Number(inputAmount)).toFixed(6)}{" "}
                {outputToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price Impact</span>
              <span>{quote.priceImpactPct.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slippage Tolerance</span>
              <span>{slippage}%</span>
            </div>
          </div>
        )}

        {/* Error messages */}
        {(quoteError || swapError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{quoteError || swapError}</AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          disabled={
            !connected ||
            !inputToken ||
            !outputToken ||
            !inputAmount ||
            inputAmount === "0" ||
            quoteLoading ||
            !!quoteError ||
            swapStatus === "loading"
          }
          onClick={swap}
        >
          {swapStatus === "loading" ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Swapping...
            </>
          ) : !connected ? (
            "Connect Wallet"
          ) : !inputToken || !outputToken ? (
            "Select Tokens"
          ) : !inputAmount || inputAmount === "0" ? (
            "Enter Amount"
          ) : (
            "Swap"
          )}
        </Button>
      </CardFooter>

      {/* Transaction status */}
      {swapStatus === "success" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-b-lg">
          <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-900/20">
            <AlertTitle>Transaction Successful</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>Your swap has been completed successfully!</p>
              <Button variant="outline" size="sm" onClick={resetSwap}>
                Close
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  )
}
