"use client"

import type React from "react"

import { useState } from "react"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface PinSetupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PinSetupDialog({ open, onOpenChange }: PinSetupDialogProps) {
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    if (pin !== confirmPin) {
      setError("PINs do not match")
      return
    }

    // Save PIN (in a real app, this would be securely stored)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "PIN Set Successfully",
        description: "Your transaction PIN has been set. You'll need this PIN for crypto-to-fiat conversions.",
        variant: "success",
      })
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Set Transaction PIN</DialogTitle>
          <DialogDescription className="text-center">
            Create a 4-digit PIN to secure your crypto-to-fiat conversions
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pin">Enter 4-digit PIN</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/[^0-9]/g, ""))
                setError("")
              }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-pin">Confirm PIN</Label>
            <Input
              id="confirm-pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => {
                setConfirmPin(e.target.value.replace(/[^0-9]/g, ""))
                setError("")
              }}
              required
            />
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}

          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Setting PIN..." : "Set PIN"}
            </Button>
          </DialogFooter>
        </form>

        <div className="mt-2 text-center text-xs text-muted-foreground">
          <p>This PIN will only be used for converting crypto to fiat.</p>
          <p>You will not need this PIN for swapping tokens.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

