// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { ArrowLeft, Wallet, Loader2 } from "lucide-react"
// import { useRouter } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useWallet } from "@solana/wallet-adapter-react"
// import { useWalletModal } from "@solana/wallet-adapter-react-ui"
// import { useToast } from "@/hooks/use-toast"
// import { truncateAddress } from "@/lib/utils"

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()
//   const { setVisible } = useWalletModal()
//   const { connected, publicKey, disconnect } = useWallet()
//   const router = useRouter()

//   // Handle navigation after successful connection
//   useEffect(() => {
//     if (connected && publicKey) {
//       const timeoutId = setTimeout(() => {
//         router.push("/dashboard")
//       })

//       return () => clearTimeout(timeoutId)
//     }
//   }, [connected, publicKey, router])

//   const handleConnectWallet = async () => {
//     try {
//       setIsLoading(true)
      
//       if (!connected) {
//         await setVisible(true)
//       } else {
//         await disconnect()
//         await setVisible(true)
//       }

//       toast({
//         title: "Wallet Connected",
//         description: "Your wallet has been successfully connected.",
//         variant: "default",
//       })
//     } catch (error) {
//       console.error("Wallet connection error:", error)
//       toast({
//         title: "Connection Error",
//         description: "Failed to connect wallet. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

 

//   return (
//     <div className="container flex min-h-screen flex-col items-center justify-center py-8 bg-background text-foreground">
//       <Link href="/" className="mb-8 flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Home
//       </Link>

//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
//           <CardDescription>Connect your Solana wallet to access your dashboard</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="rounded-full bg-primary/20 p-3">
//               <Wallet className="h-6 w-6 text-primary" />
//             </div>
//             <h3 className="text-lg font-medium">Welcome to Amigo Exchange</h3>
//             <p className="text-sm text-muted-foreground">
//               Connect your Solana wallet to access your tokens and start using Amigo Exchange.
//             </p>

//             <Button 
//               onClick={handleConnectWallet} 
//               disabled={isLoading}
//               className="w-full"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   {connected ? "Redirecting..." : "Connecting..."}
//                 </>
//               ) : connected ? (
//                 <>
//                   <Wallet className="mr-2 h-4 w-4" />
//                   {truncateAddress(publicKey?.toString() || '')}
//                 </>
//               ) : (
//                 <>
//                   <Wallet className="mr-2 h-4 w-4" />
//                   Connect Wallet
//                 </>
//               )}
//             </Button>

//             {connected && publicKey && (
//               <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 <span>Redirecting to dashboard...</span>
//               </div>
//             )}
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4 border-t p-6">
//           <p className="text-center text-sm text-muted-foreground">
//             New to Amigo Exchange?{" "}
//             <Link href="/register" className="text-primary hover:underline">
//               Create an account
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// } 



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
import { supabase } from "@/lib/supabase/client" // Make sure this import is correct for your project

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [checkingUser, setCheckingUser] = useState(false)
  const { toast } = useToast()
  const { setVisible } = useWalletModal()
  const { connected, publicKey, disconnect } = useWallet()
  const router = useRouter()

  // After wallet connection, check if user exists
  useEffect(() => {
    const checkUserExists = async () => {
      if (connected && publicKey) {
        setCheckingUser(true)
        // Query your user/profiles table for this wallet address
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("wallet_address", publicKey.toString())
          .single()

        if (error || !data) {
          toast({
            title: "Account Not Found",
            description: "No account found for this wallet. Please register first.",
            variant: "destructive",
          })
          setCheckingUser(false)
          setTimeout(() => {
            router.push("/register")
          }, 1500)
        } else {
          // User exists, proceed to dashboard
          router.push("/dashboard")
        }
      }
    }
    checkUserExists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, publicKey])

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true)
      if (!connected) {
        await setVisible(true)
      } else {
        await disconnect()
        await setVisible(true)
      }
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
              disabled={isLoading || checkingUser}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {connected ? "Checking..." : "Connecting..."}
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

            {(checkingUser || (connected && publicKey)) && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>
                  {checkingUser
                    ? "Checking account..."
                    : "Checking account..."}
                </span>
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


