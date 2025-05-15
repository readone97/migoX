"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Wallet, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useToast } from "@/hooks/use-toast"
import { truncateAddress } from "@/lib/utils"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { setVisible } = useWalletModal()
  const { connected, publicKey, disconnect } = useWallet()
  const router = useRouter()

  // Handle navigation after successful connection
  useEffect(() => {
    if (connected && publicKey) {
      const timeoutId = setTimeout(() => {
        router.push("/dashboard")
      }, 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [connected, publicKey, router])

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true)
      
      if (!connected) {
        await setVisible(true)
      } else {
        await disconnect()
        await setVisible(true)
      }

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected.",
        variant: "default",
      })
    } catch (error) {
      console.error("Wallet connection error:", error)
      toast({
        title: "Connection Error",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Prevent navigation if wallet is not connected
  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/login")
    }
  }, [connected, publicKey, router])

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-8 bg-background text-foreground">
      <Link href="/" className="mb-8 flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
          <CardDescription>Connect your Solana wallet to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-primary/20 p-3">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Welcome to Amigo Exchange</h3>
            <p className="text-sm text-muted-foreground">
              Connect your Solana wallet to access your tokens and start using Amigo Exchange.
            </p>

            <Button 
              onClick={handleConnectWallet} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {connected ? "Redirecting..." : "Connecting..."}
                </>
              ) : connected ? (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  {truncateAddress(publicKey?.toString() || '')}
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </>
              )}
            </Button>

            {connected && publicKey && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Redirecting to dashboard...</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t p-6">
          <p className="text-center text-sm text-muted-foreground">
            New to Amigo Exchange?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
} 