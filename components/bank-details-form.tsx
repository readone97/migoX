// "use client"

// import type React from "react"

// import { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { DialogFooter } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface BankDetailsFormProps {
//   initialData?: {
//     bankName: string
//     accountNumber: string
//     accountName: string
//   }
//   onSuccess?: (data: any) => void
// }

// export function BankDetailsForm({ initialData, onSuccess }: BankDetailsFormProps) {
//   const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "")
//   const [accountName, setAccountName] = useState(initialData?.accountName || "")
//   const [bankName, setBankName] = useState(initialData?.bankName || "")
//   const [isLoading, setIsLoading] = useState(false)

//   // Simulate account name lookup when account number is entered
//   const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setAccountNumber(value)

//     // Simulate API call to get account name
//     if (value.length === 10) {
//       setIsLoading(true)
//       // This would be an API call in a real application
//       setTimeout(() => {
//         setAccountName("John Doe")
//         setIsLoading(false)
//       }, 800)
//     } else {
//       setAccountName("")
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Handle form submission
//     const data = { bankName, accountNumber, accountName }

//     // Simulate API call
//     setIsLoading(true)
//     setTimeout(() => {
//       setIsLoading(false)
//       if (onSuccess) {
//         onSuccess(data)
//       }
//     }, 1000)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="bank-name">Bank Name</Label>
//         <select
//           id="bank-name"
//           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           value={bankName}
//           onChange={(e) => setBankName(e.target.value)}
//           required
//         >
//           <option value="">Select a bank</option>
//           <option value="Access Bank">Access Bank</option>
//           <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
//           <option value="Zenith Bank">Zenith Bank</option>
//           <option value="First Bank">First Bank</option>
//         </select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="account-number">Account Number</Label>
//         <Input
//           id="account-number"
//           value={accountNumber}
//           onChange={handleAccountNumberChange}
//           placeholder="Enter 10-digit account number"
//           maxLength={10}
//           required
//         />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="account-name">Account Name</Label>
//         <div className="relative">
//           <Input
//             id="account-name"
//             value={accountName}
//             readOnly
//             placeholder="Account name will appear here"
//             className="bg-muted/30"
//           />
//           {isLoading && (
//             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//               <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
//             </div>
//           )}
//         </div>
//         <p className="text-xs text-muted-foreground">
//           Account name is automatically detected based on the account number
//         </p>
//       </div>

//       <DialogFooter>
//         <Button type="submit" disabled={!accountName || !bankName || accountNumber.length !== 10 || isLoading}>
//           {isLoading ? "Processing..." : initialData ? "Update Bank Account" : "Add Bank Account"}
//         </Button>
//       </DialogFooter>
//     </form>
//   )
// }

// "use client"

// import React, { useState } from "react"

// import { Button } from "@/components/ui/button"
// import { DialogFooter } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface BankDetailsFormProps {
//   initialData?: {
//     bankName: string
//     accountNumber: string
//     accountName: string
//   }
//   onSuccess?: (data: any) => void
// }

// export function BankDetailsForm({ initialData, onSuccess }: BankDetailsFormProps) {
//   const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "")
//   const [accountName, setAccountName] = useState(initialData?.accountName || "")
//   const [bankName, setBankName] = useState(initialData?.bankName || "")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [bankCode, setBankCode] = useState("")

  // const handleAccountNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   setAccountNumber(value)
  //   setError("")

  //   if (value.length === 10) {
  //     setIsLoading(true)
  //     try {
    
  //       const response = await fetch(`https://nubapi.com/verify?account_number=${value}`)
  //       const data = await response.json()

  //       if (data.status === true) {
  //         setAccountName(data.account_name)
  //         setBankName(data.Bank_name)
  //         setError("")
  //       } else {
  //         setAccountName("")
  //         setBankName("")
  //         setError("Account not found or invalid account number.")
  //       }
  //     } catch {
  //       setAccountName("")
  //       setBankName("")
  //       setError("Error verifying account. Please try again later.")
  //     }
  //     setIsLoading(false)
  //   } else {
  //     setAccountName("")
  //     setBankName("")
  //     setError("")
  //   }
  // }


//   const handleAccountNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value
//     setAccountNumber(value)
//     setError("")
  
//     if (value.length === 10) {
//       setIsLoading(true)
//       try {
//         // Optionally pass bank_code if you have it, else omit or pass empty string
//         const response = await fetch(
//           `/api/verify-account?account_number=${value}&bank_code=${bankCode || ""}`
//         )
//         const data = await response.json()
  
//         if (data.status === true) {
//           setAccountName(data.account_name)
//           setBankName(data.Bank_name)
//           setError("")
//         } else {
//           setAccountName("")
//           setBankName("")
//           setError("Account not found or invalid account number.")
//         }
//       } catch {
//         setAccountName("")
//         setBankName("")
//         setError("Error verifying account. Please try again later.")
//       }
//       setIsLoading(false)
//     } else {
//       setAccountName("")
//       setBankName("")
//       setError("")
//     }
//   }
  

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!accountName || !bankName || accountNumber.length !== 10) {
//       return
//     }
//     const data = { bankName, accountNumber, accountName }
//     setIsLoading(true)
//     setTimeout(() => {
//       setIsLoading(false)
//       if (onSuccess) {
//         onSuccess(data)
//       }
//     }, 1000)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="bank-name">Bank Name</Label>
//         <select
//           id="bank-name"
//           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           onChange={(e) => {
//             setBankName(e.target.value)
//             // Update bankCode based on selected bank
//             const bankCodes: Record<string, string> = {
//               "Access Bank": "044",
//               "Guaranty Trust Bank": "058",
//               "Zenith Bank": "057",
//               "First Bank": "011",
//             }
//             setBankCode(bankCodes[e.target.value] || "")
//           }}
//           required
//           disabled
//         >
//           <option value="">Select a bank</option>
//           <option value="Access Bank">Access Bank</option>
//           <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
//           <option value="Zenith Bank">Zenith Bank</option>
//           <option value="First Bank">First Bank</option>
//         </select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="account-number">Account Number</Label>
//         <Input
//           id="account-number"
//           value={accountNumber}
//           onChange={handleAccountNumberChange}
//           placeholder="Enter 10-digit account number"
//           maxLength={10}
//           required
//         />
//         {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
//       </div>

//       <div className="space-y-2 relative">
//         <Label htmlFor="account-name">Account Name</Label>
//         <Input
//           id="account-name"
//           value={accountName}
//           readOnly
//           placeholder="Account name will appear here"
//           className="bg-muted/30"
//         />
//         {isLoading && (
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
//           </div>
//         )}
//         <p className="text-xs text-muted-foreground">
//           Account name is automatically detected based on the account number
//         </p>
//       </div>

//       <DialogFooter>
//         <Button
//           type="submit"
//           disabled={!accountName || !bankName || accountNumber.length !== 10 || isLoading}
//         >
//           {isLoading ? (initialData ? "Updating..." : "Processing...") : initialData ? "Update Bank Account" : "Add Bank Account"}
//         </Button>
//       </DialogFooter>
//     </form>
//   )
// }

// "use client"

// import React, { useState, useEffect } from "react"

// import { Button } from "@/components/ui/button"
// import { DialogFooter } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface BankDetailsFormProps {
//   initialData?: {
//     bankName: string
//     accountNumber: string
//     accountName: string
//   }
//   onSuccess?: (data: any) => void
// }

// const BANKS = [
//   "Access Bank",
//   "Guaranty Trust Bank",
//   "Zenith Bank",
//   "First Bank",
//   // Add more banks here if needed
// ]

// export function BankDetailsForm({ initialData, onSuccess }: BankDetailsFormProps) {
//   const [bankName, setBankName] = useState(initialData?.bankName || "")
//   const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "")
//   const [accountName, setAccountName] = useState(initialData?.accountName || "")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   // Whenever bankName or accountNumber changes, try to verify
//   useEffect(() => {
//     async function verifyAccount() {
//       setError("")
//       setAccountName("")

//       if (bankName && accountNumber.length === 10) {
//         setIsLoading(true)
//         try {
//           // const response = await fetch(
//           //   `/api/verify-account?account_number=${accountNumber}&bank_name=${encodeURIComponent(
//           //     bankName
//           //   )}`
//           // )
//           // const data = await response.json()
//           const response = await fetch(
//             `/api/verify-account?account_number=${accountNumber}&bank_name=${encodeURIComponent(bankName)}`
//           )
//           const data = await response.json()
          

//           if (response.ok && data.status === true) {
//             setAccountName(data.account_name)
//             setError("")
//           } else if (data.error) {
//             setAccountName("")
//             setError(data.error)
//           } else {
//             setAccountName("")
//             setError("Account not found or invalid account number.")
//           }
//         } catch {
//           setAccountName("")
//           setError("Error verifying account. Please try again later.")
//         }
//         setIsLoading(false)
//       } else {
//         setAccountName("")
//         setError("")
//       }
//     }

//     verifyAccount()
//   }, [bankName, accountNumber])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!bankName || !accountName || accountNumber.length !== 10 || isLoading) return

//     const data = { bankName, accountNumber, accountName }
//     if (onSuccess) onSuccess(data)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="bank-name">Bank Name</Label>
//         <select
//           id="bank-name"
//           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           value={bankName}
//           onChange={(e) => setBankName(e.target.value)}
//           required
//         >
//           <option value="">Select a bank</option>
//           {BANKS.map((bank) => (
//             <option key={bank} value={bank}>
//               {bank}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="account-number">Account Number</Label>
//         <Input
//           id="account-number"
//           value={accountNumber}
//           onChange={(e) => {
//             // Allow only digits
//             const val = e.target.value.replace(/\D/g, "")
//             setAccountNumber(val)
//           }}
//           placeholder="Enter 10-digit account number"
//           maxLength={10}
//           required
//         />
//         {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
//       </div>

//       <div className="space-y-2 relative">
//         <Label htmlFor="account-name">Account Name</Label>
//         <Input
//           id="account-name"
//           value={accountName}
//           readOnly
//           placeholder="Account name will appear here"
//           className="bg-muted/30"
//         />
//         {isLoading && (
//           <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
//           </div>
//         )}
//         <p className="text-xs text-muted-foreground">
//           Account name is automatically detected based on the bank and account number
//         </p>
//       </div>

//       <DialogFooter>
//         <Button
//           type="submit"
//           disabled={!bankName || !accountName || accountNumber.length !== 10 || isLoading}
//         >
//           {isLoading ? (initialData ? "Updating..." : "Processing...") : initialData ? "Update Bank Account" : "Add Bank Account"}
//         </Button>
//       </DialogFooter>
//     </form>
//   )
// }


"use client"

import React, { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface BankDetailsFormProps {
  initialData?: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  onSuccess?: (data: any) => void
}

const BANKS = [
  "Access Bank",
  "Guaranty Trust Bank",
  "First City Monument Bank",
  "Opay",
  "Monie-Point",
  "Palm-pay",
  "Taj Bank",
  "Globus Bank",
  "Keystone Bank",
  "Zenith Bank",
  "First Bank",
  "Unity Bank",
  "Union Bank",
  "United Bank Of Africa"
  // Add more banks here if needed
]

export function BankDetailsForm({ initialData, onSuccess }: BankDetailsFormProps) {
  const [bankName, setBankName] = useState(initialData?.bankName || "")
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "")
  const [accountName, setAccountName] = useState(initialData?.accountName || "")
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bankName || !accountName || accountNumber.length !== 10) return

    setIsLoading(true)
    setSubmitStatus("")
    
    try {
      // Create the data object to be submitted
      const data = { 
        bankName, 
        accountNumber, 
        accountName 
      }
      
      // Simulate a short processing time
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Show success message
      setSubmitStatus("success")
      
      // Call the onSuccess callback with the bank details data
      if (onSuccess) onSuccess(data)
      
      // If it's not an update, reset form fields after successful submission
      if (!initialData) {
        setBankName("")
        setAccountNumber("")
        setAccountName("")
      }
    } catch (error) {
      console.error("Error submitting bank details:", error)
      setSubmitStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bank-name">Bank Name</Label>
        <select
          id="bank-name"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        >
          <option value="">Select a bank</option>
          {BANKS.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-number">Account Number</Label>
        <Input
          id="account-number"
          value={accountNumber}
          onChange={(e) => {
            // Allow only digits
            const val = e.target.value.replace(/\D/g, "")
            setAccountNumber(val)
          }}
          placeholder="Enter 10-digit account number"
          maxLength={10}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-name">Account Name</Label>
        <Input
          id="account-name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Enter account name"
          required
        />
      </div>
      
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-green-600 text-sm font-medium">
            Bank details {initialData ? "updated" : "added"} successfully!
          </p>
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm font-medium">
            There was an error {initialData ? "updating" : "adding"} bank details. Please try again.
          </p>
        </div>
      )}

      <DialogFooter>
        <Button
          type="submit"
          disabled={!bankName || !accountName || accountNumber.length !== 10 || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
              {initialData ? "Updating..." : "Adding..."}
            </span>
          ) : (
            initialData ? "Update Bank Account" : "Add Bank Account"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}