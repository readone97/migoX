"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, CreditCard, RefreshCw } from "lucide-react"

interface Transaction {
  id: string
  type: "swap" | "convert" | "withdraw"
  date: string
  amount: string
  token: string
  status: "completed" | "pending" | "failed"
  timestamp: number
}

export function TransactionHistory() {
  // Mock transaction data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "tx1",
      type: "swap",
      date: "2024-03-14 10:25 AM",
      amount: "500 BONK → 0.05 USDC",
      token: "BONK/USDC",
      status: "completed",
      timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
    },
    {
      id: "tx2",
      type: "convert",
      date: "2024-03-13 03:45 PM",
      amount: "100 USDT → 100,000 NGN",
      token: "USDT/NGN",
      status: "completed",
      timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    },
    {
      id: "tx3",
      type: "withdraw",
      date: "2024-03-12 09:15 AM",
      amount: "50,000 NGN to Bank",
      token: "NGN",
      status: "completed",
      timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    },
    {
      id: "tx4",
      type: "swap",
      date: "2024-03-11 11:30 AM",
      amount: "1 SOL → 100 USDC",
      token: "SOL/USDC",
      status: "completed",
      timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    },
    {
      id: "tx5",
      type: "convert",
      date: "2024-03-10 02:20 PM",
      amount: "50 USDC → 50,000 NGN",
      token: "USDC/NGN",
      status: "completed",
      timestamp: Date.now() - 1000 * 60 * 60 * 96, // 4 days ago
    },
  ])

  // Simulate real-time transactions
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of adding a new transaction
      if (Math.random() < 0.1) {
        const types = ["swap", "convert", "withdraw"] as const
        const statuses = ["completed", "pending"] as const
        const type = types[Math.floor(Math.random() * types.length)]

        let amount, token
        if (type === "swap") {
          const fromTokens = ["BONK", "SOL", "USDC", "USDT"]
          const toTokens = ["USDC", "USDT", "SOL"]
          const fromToken = fromTokens[Math.floor(Math.random() * fromTokens.length)]
          const toToken = toTokens[Math.floor(Math.random() * toTokens.length)]
          amount = `${(Math.random() * 100).toFixed(2)} ${fromToken} → ${(Math.random() * 100).toFixed(2)} ${toToken}`
          token = `${fromToken}/${toToken}`
        } else if (type === "convert") {
          const fromTokens = ["USDC", "USDT", "SOL"]
          const fromToken = fromTokens[Math.floor(Math.random() * fromTokens.length)]
          amount = `${(Math.random() * 100).toFixed(2)} ${fromToken} → ${(Math.random() * 100000).toFixed(2)} NGN`
          token = `${fromToken}/NGN`
        } else {
          // Withdraw
          amount = `${(Math.random() * 100000).toFixed(2)} NGN to Bank`
          token = "NGN"
        }

        const now = new Date()
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const ampm = hours >= 12 ? "PM" : "AM"
        const formattedHours = hours % 12 || 12
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

        const newTransaction: Transaction = {
          id: `tx${Date.now()}`,
          type,
          date: `${now.toISOString().split("T")[0]} ${formattedHours}:${formattedMinutes} ${ampm}`,
          amount,
          token,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timestamp: Date.now(),
        }

        setTransactions((prev) => [newTransaction, ...prev].slice(0, 10))
      }

      // Update pending transactions
      setTransactions((prev) =>
        prev.map((tx) => {
          if (tx.status === "pending" && Math.random() < 0.3) {
            return { ...tx, status: "completed" }
          }
          return tx
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "swap":
        return <RefreshCw className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      case "convert":
        return <ArrowUpRight className="h-4 w-4 text-orange-500 dark:text-orange-400" />
      case "withdraw":
        return <CreditCard className="h-4 w-4 text-green-500 dark:text-green-400" />
    }
  }

  const getTypeLabel = (type: Transaction["type"]) => {
    switch (type) {
      case "swap":
        return "Swap"
      case "convert":
        return "Convert to Fiat"
      case "withdraw":
        return "Withdraw to Bank"
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)

    if (seconds < 60) return `${seconds} seconds ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`

    const days = Math.floor(hours / 24)
    return `${days} ${days === 1 ? "day" : "days"} ago`
  }

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-muted-foreground">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-muted p-2">{getIcon(transaction.type)}</div>
                <div>
                  <div className="font-medium">{getTypeLabel(transaction.type)}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                    <div className="text-xs text-muted-foreground">({getTimeAgo(transaction.timestamp)})</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{transaction.amount}</div>
                <div className="text-sm text-muted-foreground">{transaction.token}</div>
              </div>
              <div
                className={`ml-4 rounded-full px-2 py-1 text-xs font-medium ${
                  transaction.status === "completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : transaction.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {transaction.status === "pending" && (
                  <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-500 dark:bg-yellow-400"></span>
                )}
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

