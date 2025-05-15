"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X } from "lucide-react"

interface SwapSettingsProps {
  slippage: number
  onSlippageChange: (slippage: number) => void
  onClose: () => void
}

export const SwapSettings = ({ slippage, onSlippageChange, onClose }: SwapSettingsProps) => {
  const [customSlippage, setCustomSlippage] = useState<string>(
    slippage !== 0.1 && slippage !== 0.5 && slippage !== 1.0 ? slippage.toString() : "",
  )

  const handleCustomSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and decimals
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomSlippage(value)
      if (value !== "") {
        onSlippageChange(Number.parseFloat(value))
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">Settings</CardTitle>
          <CardDescription>Configure swap settings</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="slippage-tolerance">Slippage Tolerance</Label>
            <RadioGroup
              defaultValue={slippage.toString()}
              className="flex items-center gap-4 mt-2"
              onValueChange={(value) => {
                onSlippageChange(Number.parseFloat(value))
                setCustomSlippage("")
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0.1" id="slippage-0.1" />
                <Label htmlFor="slippage-0.1" className="cursor-pointer">
                  0.1%
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0.5" id="slippage-0.5" />
                <Label htmlFor="slippage-0.5" className="cursor-pointer">
                  0.5%
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="slippage-1" />
                <Label htmlFor="slippage-1" className="cursor-pointer">
                  1.0%
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="custom-slippage">Custom Slippage</Label>
            <div className="flex items-center mt-2">
              <Input
                id="custom-slippage"
                value={customSlippage}
                onChange={handleCustomSlippageChange}
                placeholder="Custom"
                className="max-w-[120px]"
              />
              <span className="ml-2">%</span>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Transaction will revert if the price changes unfavorably by more than this percentage.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
