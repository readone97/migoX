"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { session, signIn, verifyOtp } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  const handleCreateUsername = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.length < 3) {
      toast({
        title: "Invalid Username",
        description: "Username must be at least 3 characters long.",
        variant: "destructive",
      })
      return
    }
    setStep(2)
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await signIn(email)
    setIsLoading(false)
    setShowOtpInput(true)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await verifyOtp(email, otp)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-8 bg-background text-foreground">
      <Link href="/" className="mb-8 flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>Complete the steps below to get started with Amigo Exchange</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={`step-${step}`} value={`step-${step}`} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="step-1" disabled>
                Username
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled>
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="step-1" className="mt-6 space-y-4">
              <form onSubmit={handleCreateUsername}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Create Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter a unique username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This username will be used to identify you on the platform.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => router.push("/")}>
                      Back
                    </Button>
                    <Button type="submit">
                      Next
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="step-2" className="mt-6 space-y-4">
              <form onSubmit={showOtpInput ? handleVerifyOtp : handleSendOtp}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={showOtpInput}
                      />
                      {!showOtpInput && (
                        <Button 
                          type="submit" 
                          disabled={isLoading || !email}
                        >
                          {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                      )}
                    </div>
                  </div>

                  {showOtpInput && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter the 6-digit code"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          required
                          maxLength={6}
                          className="text-center tracking-widest"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setShowOtpInput(false)
                            setOtp("")
                          }}
                        >
                          Change Email
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter the 6-digit code sent to your email
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    {showOtpInput && (
                      <Button 
                        type="submit" 
                        disabled={isLoading || !otp}
                        className="min-w-[100px]"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t p-6">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}></span>
            <span className={`h-2 w-2 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}></span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Step {step} of 2:{" "}
            {step === 1 ? "Create Username" : "Verify Email"}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

