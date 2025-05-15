"use client"

import { useState, useEffect } from "react"
import  { Token } from "@/types"

export const useTokenList = () => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://token.jup.ag/all")

        if (!response.ok) {
          throw new Error(`Failed to fetch tokens: ${response.status}`)
        }

        const data = await response.json()

        // Sort tokens by coingeckoScore (market cap proxy)
        const sortedTokens = data.sort((a: Token, b: Token) => {
          return (b.coingeckoScore || 0) - (a.coingeckoScore || 0)
        })

        setTokens(sortedTokens)
        setError(null)
      } catch (err) {
        console.error("Error fetching token list:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch tokens")
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  return { tokens, loading, error }
}
