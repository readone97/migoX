"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function VerifyPage() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const { verifyOtp, signIn } = useAuth()

  useEffect(() => {
    if (!email) {
      // Redirect to login if no email is provided
      window.location.href = "/"
    }
  }, [email])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await verifyOtp(email, otp)
    } catch (error) {
      setError("Invalid verification code. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setError(null)
    setIsLoading(true)

    try {
      await signIn(email)
      setError(null)
      // Don't redirect since we're already on the verify page
    } catch (error) {
      setError("Failed to resend verification code. Please try again.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enter verification code</CardTitle>
          <CardDescription>We've sent a 6-digit code to {email}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="text-center text-lg tracking-widest"
                />
                <p className="text-sm text-muted-foreground mt-2">Enter the 6-digit code sent to your email address.</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={handleResendCode} disabled={isLoading}>
              Resend Code
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
