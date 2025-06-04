// // pages/api/verify-account.ts
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { account_number } = req.query

//   if (!account_number) {
//     res.status(400).json({ error: "Account number is required" })
//     return
//   }

//   try {
//     const response = await fetch(`https://nubapi.com/verify?account_number=${account_number}`)
//     const data = await response.json()
//     res.status(200).json(data)
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch account details" })
//   }
// }



// import type { NextApiRequest, NextApiResponse } from "next"

// type NubApiResponse = {
//   status?: boolean
//   account_name?: string
//   Bank_name?: string
//   [key: string]: any
// }

// type ErrorResponse = {
//   error: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<NubApiResponse | ErrorResponse>
// ) {
//   if (req.method !== "GET") {
//     res.setHeader("Allow", "GET")
//     return res.status(405).json({ error: "Method not allowed" })
//   }

//   const { account_number, bank_code } = req.query

//   if (!account_number || typeof account_number !== "string") {
//     return res.status(400).json({ error: "account_number is required" })
//   }

//   // bank_code is optional, default empty string if not provided
//   const bankCodeParam = typeof bank_code === "string" ? bank_code : ""

//   try {
//     const response = await fetch(
//       `http://nubapi.test/api/verify?account_number=${account_number}&bank_code=${bankCodeParam}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "P6KBF43URnK7u2uO6PaPYYpUMJv3MIkaIdCyPzwV1cd53a3b", // NubAPI key from docs
//         },
//       }
//     )

//     if (!response.ok) {
//       return res
//         .status(response.status)
//         .json({ error: "Failed to fetch from NubAPI" })
//     }

//     const data = await response.json()

//     return res.status(200).json(data)
//   } catch (error) {
//     console.error("Error fetching NubAPI:", error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }


// app/api/verify-account/route.ts
// import { NextResponse } from "next/server"

// const BANK_CODES: Record<string, string> = {
//   "Access Bank": "044",
//   "Guaranty Trust Bank": "058",
//   "Zenith Bank": "057",
//   "First Bank": "011",
//   // Add other banks and their codes here
// }

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url)
//   const account_number = searchParams.get("account_number")
//   const bank_name = searchParams.get("bank_name")

//   if (!account_number) {
//     return NextResponse.json({ error: "account_number is required" }, { status: 400 })
//   }
//   if (!bank_name) {
//     return NextResponse.json({ error: "bank_name is required" }, { status: 400 })
//   }

//   const bank_code = BANK_CODES[bank_name]
//   if (!bank_code) {
//     return NextResponse.json({ error: "Invalid bank name" }, { status: 400 })
//   }

//   try {
//     const response = await fetch(
//       `http://nubapi.com/api/verify?account_number=${account_number}&bank_code=${bank_code}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "b2UN6d9i5z9zoYvZNEkU0NipBDojxgAfFi6ufIld76b7cba0",
//         },
//       }
//     )

//     if (!response.ok) {
//       return NextResponse.json({ error: "Failed to fetch from NubAPI" }, { status: response.status })
//     }

//     const data = await response.json()
//     return NextResponse.json(data)
//   } catch (error) {
//     console.error("Error fetching NubAPI:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }


