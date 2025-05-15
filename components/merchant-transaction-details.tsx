"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Check, Clock, Loader2, X, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

interface Transaction {
  id: string
  userId: string
  userName: string
  fromAmount: string
  fromCurrency: string
  toAmount: string
  toCurrency: string
  bankName: string
  accountNumber: string
  accountName: string
  status: string
  createdAt: string
  updatedAt: string | null
  notes: string
}

interface MerchantTransactionDetailsProps {
  transaction: Transaction | null
  onProcess: (id: string) => void
  onReject: (id: string, reason: string) => void
  isProcessing: boolean
}

export function MerchantTransactionDetails({
  transaction,
  onProcess,
  onReject,
  isProcessing,
}: MerchantTransactionDetailsProps) {
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [transferReference, setTransferReference] = useState("")
  const [isRealTimeConfirmation, setIsRealTimeConfirmation] = useState(false)
  const [confirmationStep, setConfirmationStep] = useState(0)

  if (!transaction) {
    return <div>No transaction selected</div>
  }

  const handleProcess = () => {
    if (isRealTimeConfirmation) {
      // Start real-time confirmation process
      setConfirmationStep(1)

      // Step 1: Checking transaction
      setTimeout(() => {
        setConfirmationStep(2)

        // Step 2: Verifying bank details
        setTimeout(() => {
          setConfirmationStep(3)

          // Step 3: Confirming payment
          setTimeout(() => {
            setConfirmationStep(4)

            // Step 4: Finalizing
            setTimeout(() => {
              onProcess(transaction.id)
            }, 1000)
          }, 1500)
        }, 1500)
      }, 1500)
    } else {
      // Regular process
      onProcess(transaction.id)
    }
  }

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(transaction.id, rejectReason)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
          <p className="font-medium">{transaction.id}</p>
        </div>
        <div
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
            transaction.status === "pending"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              : transaction.status === "completed"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {transaction.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
          {transaction.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
          {transaction.status === "rejected" && <X className="mr-1 h-3 w-3" />}
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">From</p>
          <p className="font-medium">
            {transaction.fromAmount} {transaction.fromCurrency}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">To</p>
          <p className="font-medium">
            {transaction.toAmount} {transaction.toCurrency}
          </p>
        </div>
      </div>

      <div className="rounded-md border p-4">
        <h3 className="mb-2 font-medium">Bank Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
            <p>{transaction.bankName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Account Number</p>
            <p>{transaction.accountNumber}</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm font-medium text-muted-foreground">Account Name</p>
            <p>{transaction.accountName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Created At</p>
          <p>{format(new Date(transaction.createdAt), "MMM d, yyyy h:mm a")}</p>
        </div>
        {transaction.updatedAt && (
          <div>
            <p className="text-sm font-medium text-muted-foreground">Processed At</p>
            <p>{format(new Date(transaction.updatedAt), "MMM d, yyyy h:mm a")}</p>
          </div>
        )}
      </div>

      {transaction.notes && (
        <div>
          <p className="text-sm font-medium text-muted-foreground">Notes</p>
          <p className="rounded-md bg-muted p-2">{transaction.notes}</p>
        </div>
      )}

      {transaction.status === "pending" && !showRejectForm && (
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="realTimeConfirmation"
                checked={isRealTimeConfirmation}
                onChange={(e) => setIsRealTimeConfirmation(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="realTimeConfirmation" className="text-sm">
                Use real-time confirmation (shows live status updates)
              </Label>
            </div>

            {isRealTimeConfirmation && confirmationStep > 0 && (
              <div className="rounded-md bg-muted p-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-2 w-2 rounded-full ${confirmationStep >= 1 ? "bg-green-500" : "bg-muted-foreground"}`}
                    ></div>
                    <span className={confirmationStep >= 1 ? "text-foreground" : "text-muted-foreground"}>
                      Checking transaction
                    </span>
                    {confirmationStep === 1 && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
                    {confirmationStep > 1 && <Check className="ml-2 h-3 w-3 text-green-500" />}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-2 w-2 rounded-full ${confirmationStep >= 2 ? "bg-green-500" : "bg-muted-foreground"}`}
                    ></div>
                    <span className={confirmationStep >= 2 ? "text-foreground" : "text-muted-foreground"}>
                      Verifying bank details
                    </span>
                    {confirmationStep === 2 && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
                    {confirmationStep > 2 && <Check className="ml-2 h-3 w-3 text-green-500" />}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-2 w-2 rounded-full ${confirmationStep >= 3 ? "bg-green-500" : "bg-muted-foreground"}`}
                    ></div>
                    <span className={confirmationStep >= 3 ? "text-foreground" : "text-muted-foreground"}>
                      Confirming payment
                    </span>
                    {confirmationStep === 3 && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
                    {confirmationStep > 3 && <Check className="ml-2 h-3 w-3 text-green-500" />}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-2 w-2 rounded-full ${confirmationStep >= 4 ? "bg-green-500" : "bg-muted-foreground"}`}
                    ></div>
                    <span className={confirmationStep >= 4 ? "text-foreground" : "text-muted-foreground"}>
                      Finalizing transaction
                    </span>
                    {confirmationStep === 4 && <Loader2 className="ml-2 h-3 w-3 animate-spin" />}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="transferReference">Transfer Reference (Optional)</Label>
            <Input
              id="transferReference"
              placeholder="Enter bank transfer reference"
              value={transferReference}
              onChange={(e) => setTransferReference(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Add a reference number for the bank transfer if available</p>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowRejectForm(true)} disabled={isProcessing}>
              Reject
            </Button>
            <Button onClick={handleProcess} disabled={isProcessing || (isRealTimeConfirmation && confirmationStep > 0)}>
              {isProcessing || (isRealTimeConfirmation && confirmationStep > 0) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isRealTimeConfirmation && confirmationStep > 0 ? "Processing..." : "Processing..."}
                </>
              ) : (
                "Confirm Payment Sent"
              )}
            </Button>
          </div>
        </div>
      )}

      {transaction.status === "pending" && showRejectForm && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rejectReason">Reason for Rejection</Label>
            <Textarea
              id="rejectReason"
              placeholder="Enter reason for rejecting this transaction"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setShowRejectForm(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim() || isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Rejection"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

