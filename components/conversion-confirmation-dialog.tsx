"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createTransferInstruction,
} from "@solana/spl-token";

interface ConversionConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversionDetails: {
    fromAmount: string;
    fromCurrency: string;
    amount: string;
    toAmount: string;
    toCurrency: string;
    exchangeRate: number;
    fee: string;
    bankAccount: {
      bankName: string;
      accountNumber: string;
      accountName: string;
    };
  };
  onConfirm: () => void;
}

export function ConversionConfirmationDialog({
  open,
  onOpenChange,
  conversionDetails,
  onConfirm,
}: ConversionConfirmationDialogProps) {
  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const { toast } = useToast();
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const { publicKey, sendTransaction } = useWallet();
  const SPL_MINTS = {
    usdc: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    usdt: "Es9vMFrzaCERn6jQz6Lw4d1pA9wwrjz5v6Yk9k1d4wQh", // Mainnet USDT
  };
  const connection = new Connection(
    "https://serene-wispy-model.solana-mainnet.quiknode.pro/2ebdf944147ac60d02e7030145216e4e1681dd2c/"
  );

  const handleConfirm = async () => {
    //   if (!publicKey) {
    //     toast({
    //       title: "Error",
    //       description: "Please connect your wallet first",
    //       variant: "destructive",
    //     })
    //     return
    //   }

    //   setStatus("processing")

    //   try {
    //     // Convert amount to lamports
    //     const amountInLamports = Math.floor(Number(conversionDetails.fromAmount) * LAMPORTS_PER_SOL)

    //     // Create recipient public key
    //     const recipientPublicKey = new PublicKey("96gcyxCyPyTm7PsbE48dzHnPbRrA4xWk8QVCTiUS9ec5")

    //     // Create transfer instruction
    //     const transferInstruction = SystemProgram.transfer({
    //       fromPubkey: publicKey,
    //       toPubkey: recipientPublicKey,
    //       lamports: amountInLamports,
    //     })

    //     // Create and sign transaction
    //     const transaction = new Transaction().add(transferInstruction)
    //     transaction.feePayer = publicKey
    //     transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    //     // Send transaction
    //     const signature = await sendTransaction(transaction, connection)

    //     // Wait for confirmation
    //     const confirmation = await connection.confirmTransaction(signature)

    //     if (confirmation.value.err) {
    //       throw new Error("Transaction failed")
    //     }

    //     setStatus("success")
    //     toast({
    //       title: "Transfer Successful",
    //       description: `Successfully transferred ${conversionDetails.fromAmount} ${conversionDetails.fromCurrency}`,
    //       variant: "default",
    //     })

    //     // Close dialog after a delay
    //     setTimeout(() => {
    //       onOpenChange(false)
    //       setStatus("idle")
    //       onConfirm()
    //     }, 2000)
    //   } catch (error) {
    //     console.error("Transfer error:", error)
    //     setStatus("error")
    //     toast({
    //       title: "Transfer Failed",
    //       description: error instanceof Error ? error.message : "Failed to transfer tokens",
    //       variant: "destructive",
    //     })
    //     setTimeout(() => {
    //       setStatus("idle")
    //     }, 2000)
    //   }
    // }
    const handleConfirm = async () => {
      if (!publicKey) {
        toast({
          title: "Error",
          description: "Please connect your wallet first",
          variant: "destructive",
        });
        return;
      }

      setStatus("processing");
      setTxSignature(null);

      try {
        const recipientPublicKey = new PublicKey(
          "96gcyxCyPyTm7PsbE48dzHnPbRrA4xWk8QVCTiUS9ec5"
        );
        const fromAmount = Number(conversionDetails.fromAmount);

        if (isNaN(fromAmount) || fromAmount <= 0)
          throw new Error("Invalid amount");

        let transaction = new Transaction();

        if (conversionDetails.fromCurrency.toLowerCase() === "sol") {
          // SOL transfer
          const amountInLamports = Math.floor(fromAmount * LAMPORTS_PER_SOL);
          const transferInstruction = SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recipientPublicKey,
            lamports: amountInLamports,
          });
          transaction.add(transferInstruction);
        } else {
          // SPL token transfer (USDC/USDT)
          const currencyKey =
            conversionDetails.fromCurrency.toLowerCase() as keyof typeof SPL_MINTS;
          const mintAddress = SPL_MINTS[currencyKey];
          if (!mintAddress) throw new Error("Unsupported token for transfer");

          const mint = new PublicKey(mintAddress);

          // Get associated token accounts
          const fromTokenAccount = await getAssociatedTokenAddress(
            mint,
            publicKey
          );
          const toTokenAccount = await getAssociatedTokenAddress(
            mint,
            recipientPublicKey
          );

          // Amount in smallest units
          // USDC/USDT both have 6 decimals on Solana mainnet
          const decimals = 6;
          const amount = BigInt(Math.floor(fromAmount * 10 ** decimals));

          // Create transfer instruction
          const transferIx = createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            publicKey,
            amount
          );
          transaction.add(transferIx);
        }

        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;

        // Send transaction
        const signature = await sendTransaction(transaction, connection);

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction(
          signature,
          "confirmed"
        );

        if (confirmation.value.err) throw new Error("Transaction failed");

        setTxSignature(signature);
        setStatus("success");
        toast({
          title: "Transfer Successful",
          description: `Successfully transferred ${conversionDetails.fromAmount} ${conversionDetails.fromCurrency}`,
          variant: "default",
        });
        setTimeout(() => {
          onOpenChange(false);
          setStatus("idle");
          onConfirm();
        }, 3000);
      } catch (error) {
        console.error("Transfer error:", error);
        setStatus("error");
        toast({
          title: "Transfer Failed",
          description:
            error instanceof Error
              ? error.message
              : "Failed to transfer tokens",
          variant: "destructive",
        });
        setTimeout(() => {
          setStatus("idle");
        }, 2000);
      }
    };

    // Calculate estimated delivery time (1-3 hours from now)
    const getEstimatedDeliveryTime = () => {
      const now = new Date();
      const minTime = new Date(now.getTime() + 60 * 60); // 1 minute from now
      const maxTime = new Date(now.getTime() + 3 * 60 * 60); // 3 minute from now

      const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      return `${formatTime(minTime)} - ${formatTime(maxTime)}`;
    };

    return (
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          // Only allow closing if not in processing state
          if (status !== "processing" || !newOpen) {
            onOpenChange(newOpen);
            if (!newOpen) {
              setStatus("idle");
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Conversion</DialogTitle>
            <DialogDescription>
              Please review the details of your conversion before confirming.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {status === "processing" && (
              <div className="flex flex-col items-center justify-center space-y-2 py-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-center font-medium">
                  Processing your conversion...
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Please do not close this window
                </p>
              </div>
            )}

            {/* {status === "success" && (
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
              <p className="text-center font-medium">Conversion Successful!</p>
              <p className="text-center text-sm text-muted-foreground">Your funds will be transferred shortly</p>
            </div>
          )} */}
            {status === "success" && (
              <div className="flex flex-col items-center justify-center space-y-2 py-4">
                <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
                <p className="text-center font-medium">
                  Conversion Successful!
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  Your funds will be transferred shortly
                </p>
                {txSignature && (
                  <a
                    href={`https://solscan.io/tx/${txSignature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-600 dark:text-blue-400 underline text-xs"
                  >
                    View Transaction Receipt on Solscan
                  </a>
                )}
              </div>
            )}

            {status === "idle" && (
              <>
                <div className="flex flex-col items-center space-y-2 py-2">
                  <div className="flex w-full flex-col items-center rounded-lg bg-muted p-4">
                    <div className="text-lg font-bold text-primary">
                      {conversionDetails.fromAmount}{" "}
                      {conversionDetails.fromCurrency}
                    </div>
                    <ArrowDown className="my-2 h-5 w-5 text-muted-foreground" />
                    <div className="text-xl font-bold">
                      {conversionDetails.toAmount}{" "}
                      {conversionDetails.toCurrency}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Exchange Rate
                      </span>
                      <span className="text-sm font-medium">
                        1 {conversionDetails.fromCurrency} ={" "}
                        {conversionDetails.exchangeRate.toFixed(2)}{" "}
                        {conversionDetails.toCurrency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Network Fee
                      </span>
                      <span className="text-sm font-medium">
                        {conversionDetails.fee}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Recipient Bank
                      </span>
                      <span className="text-sm font-medium">
                        {conversionDetails.bankAccount.bankName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Account Number
                      </span>
                      <span className="text-sm font-medium">
                        {conversionDetails.bankAccount.accountNumber.replace(
                          /(\d{6})(\d{4})/,
                          "$1******"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Account Name
                      </span>
                      <span className="text-sm font-medium">
                        {conversionDetails.bankAccount.accountName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-400">
                        Estimated Delivery Time
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-500">
                        Your funds will be delivered to your bank account
                        between{" "}
                        <span className="font-medium">
                          {getEstimatedDeliveryTime()}
                        </span>{" "}
                        today (1-3 min).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-400">
                        Important Information
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-500">
                        By clicking "Confirm & Transfer", you agree to our terms
                        and conditions for crypto-to-fiat conversions.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <Separator />

          <DialogFooter className="sm:justify-between">
            {status === "idle" && (
              <>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm}>Confirm & Transfer</Button>
              </>
            )}

            {status === "processing" && (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </Button>
            )}

            {status === "success" && (
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Close
              </Button>
            )}

            {status === "error" && (
              <Button
                variant="outline"
                onClick={() => setStatus("idle")}
                className="w-full"
              >
                Try Again
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
}
