// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import  AmigoWalletProvider  from "@/providers/AmigoWalletProvider"

// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"
// import { AuthProvider } from "@/context/auth-context"
// import { CryptoPriceProvider } from "react-realtime-crypto-prices"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Amigo Exchange",
//   description: "Seamless Crypto to Fiat Exchange Platform",
//     generator: 'v0.dev',
    
// }


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
   
//         <AuthProvider>
//           <AmigoWalletProvider>
//             <ThemeProvider defaultTheme="dark" enableSystem>
//               {children}
//             </ThemeProvider>
//           </AmigoWalletProvider>
//         </AuthProvider>
    
//       </body>
//     </html>
//   )
// }


import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'
import AmigoWalletProvider from "@/providers/AmigoWalletProvider"
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Amigo Exchange",
  description: "Seamless Crypto to Fiat Exchange Platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AmigoWalletProvider>
        <ThemeProvider defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
        </AmigoWalletProvider>
      </body>
    </html>
  )
}






