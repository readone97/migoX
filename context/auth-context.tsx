"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type AuthContextType = {
  user: User | null
  session: Session | null
  signOut: () => Promise<void>
  signIn: (email: string) => Promise<void>
  verifyOtp: (email: string, token: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  signOut: async () => {},
  signIn: async () => {},
  verifyOtp: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const signIn = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (error) {
        if (error.status === 429) {
          toast({
            title: "Too Many Requests",
            description: "Please wait a few minutes before trying again.",
            variant: "destructive",
          })
          return
        }
        throw error
      }

      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Error signing in:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    }
  }

  const verifyOtp = async (email: string, token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      })

      if (error) {
        if (error.status === 429) {
          toast({
            title: "Too Many Requests",
            description: "Please wait a few minutes before trying again.",
            variant: "destructive",
          })
          return
        }
        throw error
      }

      toast({
        title: "Success",
        description: "Email verified successfully!",
        variant: "default",
      })
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Error verifying OTP:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    }
  }

  const value = {
    user,
    session,
    signOut,
    signIn,
    verifyOtp,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
