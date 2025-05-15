"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TokenCardProps {
  token: {
    name: string
    symbol: string
    balance: string
    value: string
    change: string
  }
  onSwap?: () => void
  onConvert?: () => void
}

export function TokenCard({ token, onSwap, onConvert }: TokenCardProps) {
  const isPositive = token.change.startsWith("+")

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{token.name}</CardTitle>
          <div className="rounded-full bg-primary/20 p-2">
            <img
              src={`/placeholder.svg?height=24&width=24&text=${token.symbol}`}
              alt={token.symbol}
              className="h-6 w-6"
            />
          </div>
        </div>
        <CardDescription>{token.symbol}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{token.balance}</div>
        <div className="flex items-center gap-2">
          <div>{token.value}</div>
          <div
            className={`flex items-center text-sm ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
          >
            {isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            {token.change}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1" onClick={onSwap}>
                Swap
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Swap {token.symbol} for other tokens</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="sm" className="flex-1" onClick={onConvert}>
                Convert
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Convert {token.symbol} to fiat currency</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

