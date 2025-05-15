"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Search } from "lucide-react"
import { Token } from "@/types"

interface TokenSelectorProps {
  selectedToken: Token | null
  onSelectToken: (token: Token) => void
  tokens: Token[]
  loading: boolean
  disabled?: boolean
}

export const TokenSelector = ({
  selectedToken,
  onSelectToken,
  tokens,
  loading,
  disabled = false,
}: TokenSelectorProps) => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Focus search input when popover opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Filter tokens based on search query
  const filteredTokens = tokens.filter((token) => {
    const query = searchQuery.toLowerCase()
    return (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.address.toLowerCase().includes(query)
    )
  })

  // Sort tokens by market cap (using coingeckoScore as proxy)
  const sortedTokens = [...filteredTokens].sort((a, b) => {
    // Put selected token at the top if it exists in filtered results
    if (selectedToken) {
      if (a.address === selectedToken.address) return -1
      if (b.address === selectedToken.address) return 1
    }

    // Then sort by coingeckoScore (higher is better)
    return (b.coingeckoScore || 0) - (a.coingeckoScore || 0)
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 min-w-[130px]" disabled={disabled || loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ) : selectedToken ? (
            <>
              {selectedToken.logoURI ? (
                <Image
                  src={selectedToken.logoURI || "/placeholder.svg"}
                  alt={selectedToken.symbol}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-muted" />
              )}
              <span>{selectedToken.symbol}</span>
            </>
          ) : (
            <span>Select token</span>
          )}
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="p-4 border-b">
          <div className="font-medium mb-2">Select a token</div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search name or paste address"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          <div className="p-2">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
              ))
            ) : sortedTokens.length > 0 ? (
              // Token list
              sortedTokens.map((token) => (
                <Button
                  key={token.address}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => {
                    onSelectToken(token)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                >
                  <div className="flex items-center gap-3">
                    {token.logoURI ? (
                      <Image
                        src={token.logoURI || "/placeholder.svg"}
                        alt={token.symbol}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {token.symbol.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div>{token.symbol}</div>
                      <div className="text-xs text-muted-foreground">{token.name}</div>
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              // No results
              <div className="p-4 text-center text-muted-foreground">No tokens found</div>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
