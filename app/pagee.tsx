// // "use client"

// // import { useEffect, useRef, useState } from "react"
// // import Image from "next/image"
// // import Link from "next/link"
// // import {
// //   ArrowRight,
// //   CheckCircle,
// //   ChevronDown,
// //   CreditCard,
// //   Shield,
// //   Wallet,
// //   Clock,
// //   BarChart,
// //   Star,
// //   Twitter,
// //   Facebook,
// //   Instagram,
// //   Linkedin,
// //   RefreshCw,
// //   ArrowDown,
// // } from "lucide-react"
// // import { motion } from "framer-motion"
// // import { Button } from "@/components/ui/button"
// // import { ThemeToggle } from "@/components/theme-toggle"
// // import { useInView } from "@/hooks/use-in-view"

// // export default function LandingPage() {
// //   const [isScrolled, setIsScrolled] = useState(false)
// //   const heroRef = useRef(null)
// //   const featuresRef = useRef(null)
// //   const howItWorksRef = useRef(null)
// //   const testimonialsRef = useRef(null)
// //   const faqRef = useRef(null)
// //   const ctaRef = useRef(null)

// //   const featuresInView = useInView(featuresRef, { once: true, threshold: 0.2 })
// //   const howItWorksInView = useInView(howItWorksRef, { once: true, threshold: 0.2 })
// //   const testimonialsInView = useInView(testimonialsRef, { once: true, threshold: 0.2 })
// //   const faqInView = useInView(faqRef, { once: true, threshold: 0.2 })
// //   const ctaInView = useInView(ctaRef, { once: true, threshold: 0.2 })

// //   const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 50)
// //     }
// //     window.addEventListener("scroll", handleScroll)
// //     return () => window.removeEventListener("scroll", handleScroll)
// //   }, [])

// //   const fadeInUp = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
// //   }

// //   const staggerContainer = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.2,
// //       },
// //     },
// //   }

// //   const fadeIn = {
// //     hidden: { opacity: 0 },
// //     visible: { opacity: 1, transition: { duration: 0.6 } },
// //   }

// //   const scaleIn = {
// //     hidden: { opacity: 0, scale: 0.8 },
// //     visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
// //   }

// //   const toggleQuestion = (index: number) => {
// //     setActiveQuestion(activeQuestion === index ? null : index)
// //   }

// //   const faqItems = [
// //     {
// //       question: "How do I convert my crypto to fiat?",
// //       answer:
// //         "Simply connect your wallet, select the crypto you want to convert, choose your bank account, and confirm the transaction. Your fiat will be transferred to your bank account within 1-3 hours.",
// //     },
// //     {
// //       question: "What cryptocurrencies are supported?",
// //       answer:
// //         "We currently support Solana (SOL), USDC, USDT, and various Solana-based tokens like BONK, Raydium, Serum, and more. We're constantly adding support for new tokens.",
// //     },
// //     {
// //       question: "How long does it take to receive my fiat?",
// //       answer:
// //         "Most conversions are processed within 1-3 hours. During high volume periods, it may take up to 24 hours. You can track the status of your conversion in your dashboard.",
// //     },
// //     {
// //       question: "What are the fees for using Amigo Exchange?",
// //       answer:
// //         "We charge a small fee of 0.5% for crypto-to-fiat conversions. Token swaps have a minimal network fee of 0.000005 SOL. There are no hidden fees or charges.",
// //     },
// //     {
// //       question: "Is my data secure on Amigo Exchange?",
// //       answer:
// //         "Yes, we use industry-standard encryption and security protocols to protect your data. We never store your private keys, and all transactions are secured with a PIN that only you know.",
// //     },
// //   ]

// //   const testimonials = [
// //     {
// //       name: "Sarah Johnson",
// //       role: "Crypto Investor",
// //       content:
// //         "Amigo Exchange made it incredibly easy to convert my SOL to Naira. The process was smooth and the funds were in my account within an hour!",
// //       avatar: "/placeholder.svg?height=60&width=60",
// //     },
// //     {
// //       name: "Michael Chen",
// //       role: "Freelance Developer",
// //       content:
// //         "I get paid in USDC for my work, and Amigo Exchange has been a lifesaver for converting to my local currency. The rates are competitive and the service is reliable.",
// //       avatar: "/placeholder.svg?height=60&width=60",
// //     },
// //     {
// //       name: "Oluwaseun Adeyemi",
// //       role: "Business Owner",
// //       content:
// //         "As someone who regularly deals with international clients, Amigo Exchange has simplified my payment process. The dashboard is intuitive and the conversion is fast.",
// //       avatar: "/placeholder.svg?height=60&width=60",
// //     },
// //   ]

// //   return (
// //     <div className="flex min-h-screen flex-col bg-[#1B1B1B] text-foreground overflow-hidden">
// //       <header
// //         className={`sticky top-0 z-50 w-full border-[#262626] border-b transition-all duration-200 ${isScrolled ? "bg-[#1B1B1B]/95 backdrop-blur-md" : "bg-transparent"}`}
// //       >
// //         <div className="container flex h-16 items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <motion.div
// //               initial={{ opacity: 0, scale: 0.8 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ duration: 0.5 }}
// //               className="flex items-center"
// //             >
// //               <Image
// //                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amigo%20logo%20%281%29-cikVxWL3vWkULPrcS1bPFKiilKTD3q.png"
// //                 alt="Amigo Exchange"
// //                 width={120}
// //                 height={40}
// //                 className="h-8 w-auto"
// //               />
// //             </motion.div>
// //           </div>
// //           <nav className="hidden md:flex items-center gap-6">
// //             <motion.div
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.1 }}
// //             >
// //               <Link
// //                 href="#features"
// //                 className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors"
// //               >
// //                 Features
// //               </Link>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.2 }}
// //             >
// //               <Link
// //                 href="#how-it-works"
// //                 className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors"
// //               >
// //                 How It Works
// //               </Link>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.3 }}
// //             >
// //               <Link
// //                 href="#testimonials"
// //                 className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors"
// //               >
// //                 Testimonials
// //               </Link>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.4 }}
// //             >
// //               <Link href="#faq" className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors">
// //                 FAQ
// //               </Link>
// //             </motion.div>
// //             <motion.div
// //               initial={{ opacity: 0, y: -10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: 0.5 }}
// //             >
// //               <ThemeToggle />
// //             </motion.div>
// //           </nav>
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.8 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.5, delay: 0.6 }}
// //             className="flex items-center gap-4"
// //           >
// //             <Button
// //               asChild
// //               className="relative overflow-hidden group bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]"
// //             >
// //               <Link href="/login">
// //                 <span className="relative z-10">Get Started</span>
// //                 <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
// //                 <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
// //               </Link>
// //             </Button>
// //           </motion.div>
// //         </div>
// //       </header>

// //       <main className="flex-1">
// //         {/* Hero Section */}
// //         <section className="relative overflow-hidden py-20 md:py-32" ref={heroRef}>
// //           <div className="absolute inset-0 bg-gradient-to-br from-[#23C69A]/5 to-[#1B1B1B]"></div>
// //           <div className="container relative z-10">
// //             <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
// //               <motion.div
// //                 initial="hidden"
// //                 animate="visible"
// //                 variants={fadeInUp}
// //                 className="flex flex-col items-center gap-6"
// //               >
// //                 <motion.span
// //                   variants={fadeIn}
// //                   className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A]"
// //                 >
// //                   Seamless Crypto to Fiat Exchange
// //                 </motion.span>
// //                 <motion.h1 variants={fadeInUp} className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
// //                   <span className="block">Convert Crypto to</span>
// //                   <span className="block text-[#23C69A]">Local Currency</span>
// //                   <span className="block">in Minutes</span>
// //                 </motion.h1>
// //                 <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl">
// //                   Connect your wallet, swap tokens, and convert to fiat with ease. Fast, secure, and reliable
// //                   crypto-to-fiat exchange for everyday users.
// //                 </motion.p>
// //                 <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
// //                   <Button
// //                     size="lg"
// //                     asChild
// //                     className="group relative overflow-hidden bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]"
// //                   >
// //                     <Link href="/login">
// //                       <span className="relative z-10">Get Started</span>
// //                       <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
// //                       <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
// //                     </Link>
// //                   </Button>
// //                 </motion.div>
// //                 <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-4">
// //                   <div className="flex items-center gap-2">
// //                     <CheckCircle className="h-5 w-5 text-[#23C69A]" />
// //                     <span className="text-sm">Fast Transfers</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <CheckCircle className="h-5 w-5 text-[#23C69A]" />
// //                     <span className="text-sm">Secure Platform</span>
// //                   </div>
// //                   <div className="flex items-center gap-2">
// //                     <CheckCircle className="h-5 w-5 text-[#23C69A]" />
// //                     <span className="text-sm">Low Fees</span>
// //                   </div>
// //                 </motion.div>
// //               </motion.div>

// //               <motion.div initial="hidden" animate="visible" variants={scaleIn} className="relative mt-12">
// //                 <div className="relative">
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.8, delay: 0.3 }}
// //                     className="absolute -top-16 -left-16 w-32 h-32 bg-[#23C69A]/20 rounded-full blur-3xl"
// //                   ></motion.div>
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.8, delay: 0.5 }}
// //                     className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#23C69A]/20 rounded-full blur-3xl"
// //                   ></motion.div>
// //                   <div className="relative z-10 bg-gradient-to-br from-[#262626] to-[#1B1B1B] p-2 rounded-2xl shadow-xl border border-[#262626]/50">
// //                     <Image
// //                       src="/placeholder.svg?height=600&width=800&text=Amigo+Exchange"
// //                       alt="Amigo Exchange Dashboard"
// //                       width={800}
// //                       height={600}
// //                       className="rounded-xl shadow-sm"
// //                     />
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ duration: 0.5, delay: 0.8 }}
// //                       className="absolute -bottom-6 -left-6 bg-[#262626] rounded-lg shadow-lg p-4 border border-[#262626]/50"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <div className="h-10 w-10 rounded-full bg-[#23C69A]/20 flex items-center justify-center">
// //                           <CreditCard className="h-5 w-5 text-[#23C69A]" />
// //                         </div>
// //                         <div>
// //                           <div className="text-sm font-medium">Instant Conversion</div>
// //                           <div className="text-xs text-gray-400">USDT → NGN</div>
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ duration: 0.5, delay: 1 }}
// //                       className="absolute -top-6 -right-6 bg-[#262626] rounded-lg shadow-lg p-4 border border-[#262626]/50"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <div className="h-10 w-10 rounded-full bg-[#23C69A]/20 flex items-center justify-center">
// //                           <CheckCircle className="h-5 w-5 text-[#23C69A]" />
// //                         </div>
// //                         <div>
// //                           <div className="text-sm font-medium">Transfer Complete</div>
// //                           <div className="text-xs text-gray-400">Funds received</div>
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </div>
// //         </section>

// //         {/* Floating Coins Animation */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           {[...Array(8)].map((_, i) => (
// //             <motion.div
// //               key={i}
// //               initial={{
// //                 x: Math.random() * 100 - 50 + "%",
// //                 y: -20,
// //                 opacity: 0,
// //                 scale: Math.random() * 0.5 + 0.5,
// //               }}
// //               animate={{
// //                 y: "120%",
// //                 opacity: [0, 1, 0],
// //                 rotate: Math.random() * 360,
// //               }}
// //               transition={{
// //                 duration: Math.random() * 15 + 15,
// //                 repeat: Number.POSITIVE_INFINITY,
// //                 delay: Math.random() * 5,
// //               }}
// //               className="absolute w-12 h-12 rounded-full"
// //             >
// //               <Image
// //                 src={`/placeholder.svg?height=48&width=48&text=${["SOL", "USDT", "USDC", "BONK"][i % 4]}`}
// //                 alt="Crypto coin"
// //                 width={48}
// //                 height={48}
// //                 className="rounded-full"
// //               />
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* Trusted By Section */}
// //         <section className="py-12 border-y border-[#262626] bg-[#262626]/30">
// //           <div className="container">
// //             <div className="text-center mb-8">
// //               <h2 className="text-lg font-medium text-gray-400">Trusted by users across Africa</h2>
// //             </div>
// //             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
// //               {["Bank A", "Exchange B", "Wallet C", "Partner D", "Company E"].map((partner, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   transition={{ duration: 0.5, delay: index * 0.1 }}
// //                   className="grayscale hover:grayscale-0 transition-all duration-300"
// //                 >
// //                   <Image
// //                     src={`/placeholder.svg?height=40&width=120&text=${partner}`}
// //                     alt={partner}
// //                     width={120}
// //                     height={40}
// //                   />
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Features Section */}
// //         <section id="features" className="py-20 md:py-32" ref={featuresRef}>
// //           <div className="container">
// //             <motion.div
// //               initial="hidden"
// //               animate={featuresInView ? "visible" : "hidden"}
// //               variants={fadeInUp}
// //               className="text-center max-w-3xl mx-auto mb-16"
// //             >
// //               <motion.span
// //                 variants={fadeIn}
// //                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
// //               >
// //                 Key Features
// //               </motion.span>
// //               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
// //                 Everything You Need for Crypto-to-Fiat Exchange
// //               </motion.h2>
// //               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
// //                 Our platform provides all the tools you need to seamlessly convert your crypto assets to local currency.
// //               </motion.p>
// //             </motion.div>

// //             <motion.div
// //               initial="hidden"
// //               animate={featuresInView ? "visible" : "hidden"}
// //               variants={staggerContainer}
// //               className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
// //             >
// //               {[
// //                 {
// //                   icon: <Wallet className="h-10 w-10 text-[#23C69A]" />,
// //                   title: "Easy Wallet Connection",
// //                   description: "Connect your Solana wallet with a single click and instantly access your tokens.",
// //                 },
// //                 {
// //                   icon: <RefreshCw className="h-10 w-10 text-[#23C69A]" />,
// //                   title: "Token Swapping",
// //                   description: "Swap Solana-based tokens for USDC, USDT, or SOL with real-time rates and minimal fees.",
// //                 },
// //                 {
// //                   icon: <CreditCard className="h-10 w-10 text-[#23C69A]" />,
// //                   title: "Fiat Conversion",
// //                   description: "Convert your crypto to local currency and transfer directly to your bank account.",
// //                 },
// //                 {
// //                   icon: <Shield className="h-10 w-10 text-[#23C69A]" />,
// //                   title: "Secure Transactions",
// //                   description: "All transactions are secured with PIN verification and industry-standard encryption.",
// //                 },
// //                 {
// //                   icon: <Clock className="h-10 w-10 text-[#23C69A]" />,
// //                   title: "Fast Processing",
// //                   description: "Receive your funds in your bank account within 1-3 hours of conversion.",
// //                 },
// //                 {
// //                   icon: <BarChart className="h-10 w-10 text-[#23C69A]" />,
// //                   title: "Real-Time Rates",
// //                   description: "Get the best exchange rates with real-time updates from the market.",
// //                 },
// //               ].map((feature, index) => (
// //                 <motion.div
// //                   key={index}
// //                   variants={fadeInUp}
// //                   className="group relative overflow-hidden rounded-xl border border-[#262626] bg-[#262626] p-6 hover:shadow-md transition-all duration-300"
// //                 >
// //                   <div className="absolute inset-0 bg-gradient-to-br from-[#23C69A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// //                   <div className="relative z-10">
// //                     <div className="mb-4 rounded-full bg-[#23C69A]/10 p-3 w-16 h-16 flex items-center justify-center">
// //                       {feature.icon}
// //                     </div>
// //                     <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
// //                     <p className="text-gray-400">{feature.description}</p>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </motion.div>
// //           </div>
// //         </section>

// //         {/* Add this right before the How It Works section */}
// //         <div className="w-full h-16"></div>

// //         {/* How It Works Section */}
// //         <section
// //           id="how-it-works"
// //           className="relative py-20 md:py-32 overflow-hidden z-10 bg-[#1B1B1B]"
// //           ref={howItWorksRef}
// //         >
// //           {/* Background elements */}
// //           <div className="absolute inset-0 bg-[#262626]/20"></div>
// //           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
// //             <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#23C69A]/10 rounded-full blur-[100px]"></div>
// //             <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[#23C69A]/10 rounded-full blur-[100px]"></div>
// //           </div>

// //           <div className="container relative z-10">
// //             <motion.div
// //               initial="hidden"
// //               animate={howItWorksInView ? "visible" : "hidden"}
// //               variants={fadeInUp}
// //               className="text-center max-w-3xl mx-auto mb-16"
// //             >
// //               <motion.span
// //                 variants={fadeIn}
// //                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
// //               >
// //                 Simple Process
// //               </motion.span>
// //               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
// //                 How Amigo Exchange Works
// //               </motion.h2>
// //               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
// //                 Converting your crypto to fiat has never been easier. Follow these simple steps to get started.
// //               </motion.p>
// //             </motion.div>

// //             <div className="relative">
// //               {/* Vertical connection line */}
// //               <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#23C69A]/0 via-[#23C69A]/50 to-[#23C69A]/0 hidden lg:block"></div>

// //               {/* Steps */}
// //               {[
// //                 {
// //                   title: "Connect Your Wallet",
// //                   description:
// //                     "Link your Solana wallet to Amigo Exchange with a single click. We support Phantom, Solflare, and other popular wallets.",
// //                   image: "/placeholder.svg?height=300&width=400&text=Connect+Wallet",
// //                   icon: <Wallet className="h-8 w-8" />,
// //                 },
// //                 {
// //                   title: "Add Your Bank Details",
// //                   description:
// //                     "Enter your bank account information securely. We'll verify your account to ensure smooth transfers.",
// //                   image: "/placeholder.svg?height=300&width=400&text=Bank+Details",
// //                   icon: <CreditCard className="h-8 w-8" />,
// //                 },
// //                 {
// //                   title: "Select Tokens to Convert",
// //                   description:
// //                     "Choose which tokens you want to convert to fiat. We support SOL, USDC, USDT, and many Solana-based tokens.",
// //                   image: "/placeholder.svg?height=300&width=400&text=Select+Tokens",
// //                   icon: <RefreshCw className="h-8 w-8" />,
// //                 },
// //                 {
// //                   title: "Confirm and Receive",
// //                   description:
// //                     "Confirm the conversion with your PIN, and receive the funds in your bank account within 1-3 hours.",
// //                   image: "/placeholder.svg?height=300&width=400&text=Confirm+Transfer",
// //                   icon: <CheckCircle className="h-8 w-8" />,
// //                 },
// //               ].map((step, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial="hidden"
// //                   animate={howItWorksInView ? "visible" : "hidden"}
// //                   variants={{
// //                     hidden: { opacity: 0 },
// //                     visible: {
// //                       opacity: 1,
// //                       transition: {
// //                         delay: index * 0.2,
// //                         duration: 0.6,
// //                       },
// //                     },
// //                   }}
// //                   className="mb-16 last:mb-0"
// //                 >
// //                   <div className="flex flex-col lg:flex-row items-center gap-8 relative">
// //                     {/* Step number for mobile */}
// //                     <div className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#23C69A] text-[#1B1B1B] font-bold text-xl mb-4">
// //                       {index + 1}
// //                     </div>

// //                     {/* Left side - Image for even steps on large screens */}
// //                     <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
// //                       <motion.div
// //                         whileHover={{ scale: 1.03 }}
// //                         transition={{ duration: 0.3 }}
// //                         className="relative group"
// //                       >
// //                         <div className="absolute -inset-1 bg-gradient-to-r from-[#23C69A]/20 to-[#23C69A]/0 rounded-xl blur-sm group-hover:blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
// //                         <div className="relative rounded-xl overflow-hidden border border-[#262626] shadow-lg">
// //                           <Image
// //                             src={step.image || "/placeholder.svg"}
// //                             alt={step.title}
// //                             width={500}
// //                             height={300}
// //                             className="w-full h-auto object-cover"
// //                           />
// //                           <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] to-transparent opacity-60"></div>
// //                           <div className="absolute bottom-0 left-0 right-0 p-4">
// //                             <div className="flex items-center gap-2">
// //                               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#23C69A] text-[#1B1B1B]">
// //                                 {step.icon}
// //                               </div>
// //                               <span className="text-lg font-bold">Step {index + 1}</span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </motion.div>
// //                     </div>

// //                     {/* Center step indicator for large screens */}
// //                     <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         animate={howItWorksInView ? { scale: 1, rotate: 360 } : { scale: 0 }}
// //                         transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
// //                         className="flex items-center justify-center w-16 h-16 rounded-full bg-[#23C69A] text-[#1B1B1B] font-bold text-2xl border-4 border-[#1B1B1B]"
// //                       >
// //                         {index + 1}
// //                       </motion.div>
// //                     </div>

// //                     {/* Right side - Content for even steps on large screens */}
// //                     <div
// //                       className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"} ${index % 2 === 0 ? "lg:pl-16" : "lg:pr-16"}`}
// //                     >
// //                       <motion.div
// //                         variants={{
// //                           hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
// //                           visible: {
// //                             opacity: 1,
// //                             x: 0,
// //                             transition: {
// //                               delay: index * 0.2 + 0.2,
// //                               duration: 0.5,
// //                             },
// //                           },
// //                         }}
// //                         className={`${index % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}
// //                       >
// //                         <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
// //                         <p className="text-gray-400 text-lg">{step.description}</p>

// //                         {/* Animated arrow for next step */}
// //                         {index < 3 && (
// //                           <motion.div
// //                             animate={{ y: [0, 10, 0] }}
// //                             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                             className={`mt-6 hidden lg:flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
// //                           >
// //                             <ArrowDown className="h-8 w-8 text-[#23C69A]" />
// //                           </motion.div>
// //                         )}
// //                       </motion.div>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>

// //             {/* Final CTA */}
// //             <motion.div
// //               initial="hidden"
// //               animate={howItWorksInView ? "visible" : "hidden"}
// //               variants={{
// //                 hidden: { opacity: 0, y: 30 },
// //                 visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.6 } },
// //               }}
// //               className="mt-16 text-center"
// //             >
// //               <Button asChild size="lg" className="bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]">
// //                 <Link href="/login">
// //                   <span>Start Converting Now</span>
// //                   <ArrowRight className="ml-2 h-5 w-5" />
// //                 </Link>
// //               </Button>
// //             </motion.div>
// //           </div>
// //         </section>

// //         {/* Testimonials Section */}
// //         <section id="testimonials" className="py-20 md:py-32" ref={testimonialsRef}>
// //           <div className="container">
// //             <motion.div
// //               initial="hidden"
// //               animate={testimonialsInView ? "visible" : "hidden"}
// //               variants={fadeInUp}
// //               className="text-center max-w-3xl mx-auto mb-16"
// //             >
// //               <motion.span
// //                 variants={fadeIn}
// //                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
// //               >
// //                 Testimonials
// //               </motion.span>
// //               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
// //                 What Our Users Say
// //               </motion.h2>
// //               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
// //                 Don't just take our word for it. Here's what our users have to say about Amigo Exchange.
// //               </motion.p>
// //             </motion.div>

// //             <motion.div
// //               initial="hidden"
// //               animate={testimonialsInView ? "visible" : "hidden"}
// //               variants={staggerContainer}
// //               className="grid md:grid-cols-3 gap-8"
// //             >
// //               {testimonials.map((testimonial, index) => (
// //                 <motion.div
// //                   key={index}
// //                   variants={fadeInUp}
// //                   className="bg-[#262626] rounded-xl p-6 border border-[#262626] shadow-sm hover:shadow-md transition-shadow duration-300"
// //                 >
// //                   <div className="flex items-center gap-4 mb-4">
// //                     <Image
// //                       src={testimonial.avatar || "/placeholder.svg"}
// //                       alt={testimonial.name}
// //                       width={60}
// //                       height={60}
// //                       className="rounded-full"
// //                     />
// //                     <div>
// //                       <h4 className="font-semibold">{testimonial.name}</h4>
// //                       <p className="text-sm text-gray-400">{testimonial.role}</p>
// //                     </div>
// //                   </div>
// //                   <p className="text-gray-400 italic">"{testimonial.content}"</p>
// //                   <div className="mt-4 flex">
// //                     {[...Array(5)].map((_, i) => (
// //                       <Star key={i} className="h-5 w-5 text-[#23C69A] fill-[#23C69A]" />
// //                     ))}
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </motion.div>
// //           </div>
// //         </section>

// //         {/* FAQ Section */}
// //         <section id="faq" className="py-20 md:py-32 bg-[#262626]/30" ref={faqRef}>
// //           <div className="container">
// //             <motion.div
// //               initial="hidden"
// //               animate={faqInView ? "visible" : "hidden"}
// //               variants={fadeInUp}
// //               className="text-center max-w-3xl mx-auto mb-16"
// //             >
// //               <motion.span
// //                 variants={fadeIn}
// //                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
// //               >
// //                 Frequently Asked Questions
// //               </motion.span>
// //               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
// //                 Got Questions? We've Got Answers
// //               </motion.h2>
// //               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
// //                 Find answers to the most common questions about Amigo Exchange.
// //               </motion.p>
// //             </motion.div>

// //             <motion.div
// //               initial="hidden"
// //               animate={faqInView ? "visible" : "hidden"}
// //               variants={staggerContainer}
// //               className="max-w-3xl mx-auto"
// //             >
// //               {faqItems.map((item, index) => (
// //                 <motion.div key={index} variants={fadeInUp} className="mb-4 last:mb-0">
// //                   <button
// //                     onClick={() => toggleQuestion(index)}
// //                     className={`w-full flex items-center justify-between rounded-lg border border-[#262626] p-4 text-left font-medium transition-all ${
// //                       activeQuestion === index ? "bg-[#23C69A]/5 border-[#23C69A]/20" : "hover:bg-[#262626]"
// //                     }`}
// //                   >
// //                     <span>{item.question}</span>
// //                     <ChevronDown
// //                       className={`h-5 w-5 transition-transform duration-200 ${
// //                         activeQuestion === index ? "rotate-180" : ""
// //                       }`}
// //                     />
// //                   </button>
// //                   <div
// //                     className={`overflow-hidden transition-all duration-300 ${
// //                       activeQuestion === index ? "max-h-40 mt-2" : "max-h-0"
// //                     }`}
// //                   >
// //                     <div className="p-4 rounded-lg bg-[#262626]/50">
// //                       <p className="text-gray-400">{item.answer}</p>
// //                     </div>
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </motion.div>
// //           </div>
// //         </section>

// //         {/* CTA Section */}
// //         <section className="py-20 md:py-32" ref={ctaRef}>
// //           <div className="container">
// //             <motion.div
// //               initial="hidden"
// //               animate={ctaInView ? "visible" : "hidden"}
// //               variants={fadeInUp}
// //               className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#23C69A]/80 to-[#23C69A] p-8 md:p-12"
// //             >
// //               <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)]"></div>
// //               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
// //                 <div className="text-center md:text-left">
// //                   <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-4">Ready to Convert Your Crypto?</h2>
// //                   <p className="text-[#1B1B1B]/80 text-lg max-w-xl">
// //                     Join thousands of users who trust Amigo Exchange for their crypto-to-fiat needs. Get started in
// //                     minutes.
// //                   </p>
// //                 </div>
// //                 <div className="flex flex-col sm:flex-row gap-4">
// //                   <Button size="lg" asChild className="bg-[#1B1B1B] text-white hover:bg-[#1B1B1B]/90">
// //                     <Link href="/login">
// //                       <span>Get Started Now</span>
// //                       <ArrowRight className="ml-2 h-5 w-5" />
// //                     </Link>
// //                   </Button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </section>
// //       </main>

// //       <footer className="border-t border-[#262626] py-12 md:py-16 bg-[#1B1B1B]">
// //         <div className="container">
// //           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
// //             <div className="col-span-2 lg:col-span-2">
// //               <div className="flex items-center gap-2 mb-4">
// //                 <span className="text-xl font-bold text-[#23C69A]">Amigo Exchange</span>
// //               </div>
// //               <p className="text-gray-400 mb-4 max-w-xs">
// //                 The easiest way to convert your crypto to local currency. Fast, secure, and reliable.
// //               </p>
// //               <div className="flex gap-4">
// //                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                   <Twitter className="h-5 w-5" />
// //                   <span className="sr-only">Twitter</span>
// //                 </Link>
// //                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                   <Facebook className="h-5 w-5" />
// //                   <span className="sr-only">Facebook</span>
// //                 </Link>
// //                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                   <Instagram className="h-5 w-5" />
// //                   <span className="sr-only">Instagram</span>
// //                 </Link>
// //                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                   <Linkedin className="h-5 w-5" />
// //                   <span className="sr-only">LinkedIn</span>
// //                 </Link>
// //               </div>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold mb-4">Product</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <Link href="#features" className="text-gray-400 hover:text-[#23C69A]">
// //                     Features
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#how-it-works" className="text-gray-400 hover:text-[#23C69A]">
// //                     How It Works
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Pricing
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Roadmap
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold mb-4">Company</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     About Us
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Careers
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Blog
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#testimonials" className="text-gray-400 hover:text-[#23C69A]">
// //                     Testimonials
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold mb-4">Support</h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <Link href="#faq" className="text-gray-400 hover:text-[#23C69A]">
// //                     FAQ
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Contact Us
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Help Center
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
// //                     Security
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //           <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4">
// //             <p className="text-sm text-gray-400">© {new Date().getFullYear()} Amigo Exchange. All rights reserved.</p>
// //             <div className="flex gap-6">
// //               <Link href="/terms" className="text-sm text-gray-400 hover:text-[#23C69A]">
// //                 Terms of Service
// //               </Link>
// //               <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#23C69A]">
// //                 Privacy Policy
// //               </Link>
// //               <Link href="/cookies" className="text-sm text-gray-400 hover:text-[#23C69A]">
// //                 Cookies
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   )
// // }

// "use client"

// import { useEffect, useRef, useState } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import {
//   ArrowRight,
//   CheckCircle,
//   ChevronDown,
//   CreditCard,
//   Shield,
//   Wallet,
//   Clock,
//   BarChart,
//   Star,
//   Twitter,
//   Facebook,
//   Instagram,
//   Linkedin,
//   RefreshCw,
//   ArrowDown,
// } from "lucide-react"
// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { useInView } from "@/hooks/use-in-view"

// export default function LandingPage() {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const heroRef = useRef(null)
//   const featuresRef = useRef(null)
//   const howItWorksRef = useRef(null)
//   const testimonialsRef = useRef(null)
//   const faqRef = useRef(null)
//   const ctaRef = useRef(null)

//   const featuresInView = useInView(featuresRef, { once: true, threshold: 0.2 })
//   const howItWorksInView = useInView(howItWorksRef, { once: true, threshold: 0.2 })
//   const testimonialsInView = useInView(testimonialsRef, { once: true, threshold: 0.2 })
//   const faqInView = useInView(faqRef, { once: true, threshold: 0.2 })
//   const ctaInView = useInView(ctaRef, { once: true, threshold: 0.2 })

//   const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   }

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   }

//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.6 } },
//   }

//   const scaleIn = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
//   }

//   const toggleQuestion = (index: number) => {
//     setActiveQuestion(activeQuestion === index ? null : index)
//   }

//   const faqItems = [
//     {
//       question: "How do I convert my crypto to fiat?",
//       answer:
//         "Simply connect your wallet, select the crypto you want to convert, choose your bank account, and confirm the transaction. Your fiat will be transferred to your bank account within 1-3 hours.",
//     },
//     {
//       question: "What cryptocurrencies are supported?",
//       answer:
//         "We currently support Solana (SOL), USDC, USDT, and various Solana-based tokens like BONK, Raydium, Serum, and more. We're constantly adding support for new tokens.",
//     },
//     {
//       question: "How long does it take to receive my fiat?",
//       answer:
//         "Most conversions are processed within 1-3 hours. During high volume periods, it may take up to 24 hours. You can track the status of your conversion in your dashboard.",
//     },
//     {
//       question: "What are the fees for using Amigo Exchange?",
//       answer:
//         "We charge a small fee of 0.5% for crypto-to-fiat conversions. Token swaps have a minimal network fee of 0.000005 SOL. There are no hidden fees or charges.",
//     },
//     {
//       question: "Is my data secure on Amigo Exchange?",
//       answer:
//         "Yes, we use industry-standard encryption and security protocols to protect your data. We never store your private keys, and all transactions are secured with a PIN that only you know.",
//     },
//   ]

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Crypto Investor",
//       content:
//         "Amigo Exchange made it incredibly easy to convert my SOL to Naira. The process was smooth and the funds were in my account within an hour!",
//       avatar: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       name: "Michael Chen",
//       role: "Freelance Developer",
//       content:
//         "I get paid in USDC for my work, and Amigo Exchange has been a lifesaver for converting to my local currency. The rates are competitive and the service is reliable.",
//       avatar: "/placeholder.svg?height=60&width=60",
//     },
//     {
//       name: "Oluwaseun Adeyemi",
//       role: "Business Owner",
//       content:
//         "As someone who regularly deals with international clients, Amigo Exchange has simplified my payment process. The dashboard is intuitive and the conversion is fast.",
//       avatar: "/placeholder.svg?height=60&width=60",
//     },
//   ]

//   return (
//     <div className="flex min-h-screen flex-col bg-[#1B1B1B] text-foreground overflow-hidden">
//       <header
//         className={`sticky top-0 z-50 w-full border-[#262626] border-b transition-all duration-200 ${isScrolled ? "bg-[#1B1B1B]/95 backdrop-blur-md" : "bg-transparent"}`}
//       >
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="flex items-center"
//             >
//               <Image
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Amigo%20logo%20%281%29-cikVxWL3vWkULPrcS1bPFKiilKTD3q.png"
//                 alt="Amigo Exchange"
//                 width={120}
//                 height={40}
//                 className="h-8 w-auto"
//               />
//             </motion.div>
//           </div>
//           <nav className="hidden md:flex items-center gap-6">
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <Link
//                 href="#features"
//                 className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors"
//               >
//                 Features
//               </Link>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Link
//                 href="#how-it-works"
//                 className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors"
//               >
//                 How It Works
//               </Link>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <Link
//                 href="#testimonials"
//                 className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors"
//               >
//                 Testimonials
//               </Link>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <Link href="#faq" className="text-sm font-medium text-gray-400 hover:text-[#23C69A] transition-colors">
//                 FAQ
//               </Link>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.5 }}
//             >
//               <ThemeToggle />
//             </motion.div>
//           </nav>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="flex items-center gap-4"
//           >
//             <Button
//               asChild
//               className="relative overflow-hidden group bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]"
//             >
//               <Link href="/register">
//                 <span className="relative z-10">Get Started</span>
//                 <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//                 <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//               </Link>
//             </Button>
//           </motion.div>
//         </div>
//       </header>

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="relative overflow-hidden py-20 md:py-32" ref={heroRef}>
//           <div className="absolute inset-0 bg-gradient-to-br from-[#23C69A]/5 to-[#1B1B1B]"></div>
//           <div className="container relative z-10">
//             <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInUp}
//                 className="flex flex-col items-center gap-6"
//               >
//                 <motion.span
//                   variants={fadeIn}
//                   className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A]"
//                 >
//                   Seamless Crypto to Fiat Exchange
//                 </motion.span>
//                 <motion.h1 variants={fadeInUp} className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
//                   <span className="block">Convert Crypto to</span>
//                   <span className="block text-[#23C69A]">Local Currency</span>
//                   <span className="block">in Minutes</span>
//                 </motion.h1>
//                 <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl">
//                   Connect your wallet, swap tokens, and convert to fiat with ease. Fast, secure, and reliable
//                   crypto-to-fiat exchange for everyday users.
//                 </motion.p>
//                 <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
//                   <Button
//                     size="lg"
//                     asChild
//                     className="group relative overflow-hidden bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]"
//                   >
//                     <Link href="/register">
//                       <span className="relative z-10">Get Started</span>
//                       <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
//                       <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//                     </Link>
//                   </Button>
//                 </motion.div>
//                 <motion.div variants={fadeInUp} className="flex items-center gap-6 mt-4">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="h-5 w-5 text-[#23C69A]" />
//                     <span className="text-sm">Fast Transfers</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="h-5 w-5 text-[#23C69A]" />
//                     <span className="text-sm">Secure Platform</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="h-5 w-5 text-[#23C69A]" />
//                     <span className="text-sm">Low Fees</span>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               <motion.div initial="hidden" animate="visible" variants={scaleIn} className="relative mt-12">
//                 <div className="relative">
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                     className="absolute -top-16 -left-16 w-32 h-32 bg-[#23C69A]/20 rounded-full blur-3xl"
//                   ></motion.div>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, delay: 0.5 }}
//                     className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#23C69A]/20 rounded-full blur-3xl"
//                   ></motion.div>
//                   <div className="relative z-10 bg-gradient-to-br from-[#262626] to-[#1B1B1B] p-2 rounded-2xl shadow-xl border border-[#262626]/50">
//                     <Image
//                       src="/placeholder.svg?height=600&width=800&text=Amigo+Exchange"
//                       alt="Amigo Exchange Dashboard"
//                       width={800}
//                       height={600}
//                       className="rounded-xl shadow-sm"
//                     />
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5, delay: 0.8 }}
//                       className="absolute -bottom-6 -left-6 bg-[#262626] rounded-lg shadow-lg p-4 border border-[#262626]/50"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full bg-[#23C69A]/20 flex items-center justify-center">
//                           <CreditCard className="h-5 w-5 text-[#23C69A]" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium">Instant Conversion</div>
//                           <div className="text-xs text-gray-400">USDT → NGN</div>
//                         </div>
//                       </div>
//                     </motion.div>
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.5, delay: 1 }}
//                       className="absolute -top-6 -right-6 bg-[#262626] rounded-lg shadow-lg p-4 border border-[#262626]/50"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="h-10 w-10 rounded-full bg-[#23C69A]/20 flex items-center justify-center">
//                           <CheckCircle className="h-5 w-5 text-[#23C69A]" />
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium">Transfer Complete</div>
//                           <div className="text-xs text-gray-400">Funds received</div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Floating Coins Animation */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               initial={{
//                 x: Math.random() * 100 - 50 + "%",
//                 y: -20,
//                 opacity: 0,
//                 scale: Math.random() * 0.5 + 0.5,
//               }}
//               animate={{
//                 y: "120%",
//                 opacity: [0, 1, 0],
//                 rotate: Math.random() * 360,
//               }}
//               transition={{
//                 duration: Math.random() * 15 + 15,
//                 repeat: Number.POSITIVE_INFINITY,
//                 delay: Math.random() * 5,
//               }}
//               className="absolute w-12 h-12 rounded-full"
//             >
//               <Image
//                 src={`/placeholder.svg?height=48&width=48&text=${["SOL", "USDT", "USDC", "BONK"][i % 4]}`}
//                 alt="Crypto coin"
//                 width={48}
//                 height={48}
//                 className="rounded-full"
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Trusted By Section */}
//         <section className="py-12 border-y border-[#262626] bg-[#262626]/30">
//           <div className="container">
//             <div className="text-center mb-8">
//               <h2 className="text-lg font-medium text-gray-400">Trusted by users across Africa</h2>
//             </div>
//             <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
//               {["Bank A", "Exchange B", "Wallet C", "Partner D", "Company E"].map((partner, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="grayscale hover:grayscale-0 transition-all duration-300"
//                 >
//                   <Image
//                     src={`/placeholder.svg?height=40&width=120&text=${partner}`}
//                     alt={partner}
//                     width={120}
//                     height={40}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="py-20 md:py-32" ref={featuresRef}>
//           <div className="container">
//             <motion.div
//               initial="hidden"
//               animate={featuresInView ? "visible" : "hidden"}
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <motion.span
//                 variants={fadeIn}
//                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
//               >
//                 Key Features
//               </motion.span>
//               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
//                 Everything You Need for Crypto-to-Fiat Exchange
//               </motion.h2>
//               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
//                 Our platform provides all the tools you need to seamlessly convert your crypto assets to local currency.
//               </motion.p>
//             </motion.div>

//             <motion.div
//               initial="hidden"
//               animate={featuresInView ? "visible" : "hidden"}
//               variants={staggerContainer}
//               className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
//             >
//               {[
//                 {
//                   icon: <Wallet className="h-10 w-10 text-[#23C69A]" />,
//                   title: "Easy Wallet Connection",
//                   description: "Connect your Solana wallet with a single click and instantly access your tokens.",
//                 },
//                 {
//                   icon: <RefreshCw className="h-10 w-10 text-[#23C69A]" />,
//                   title: "Token Swapping",
//                   description: "Swap Solana-based tokens for USDC, USDT, or SOL with real-time rates and minimal fees.",
//                 },
//                 {
//                   icon: <CreditCard className="h-10 w-10 text-[#23C69A]" />,
//                   title: "Fiat Conversion",
//                   description: "Convert your crypto to local currency and transfer directly to your bank account.",
//                 },
//                 {
//                   icon: <Shield className="h-10 w-10 text-[#23C69A]" />,
//                   title: "Secure Transactions",
//                   description: "All transactions are secured with PIN verification and industry-standard encryption.",
//                 },
//                 {
//                   icon: <Clock className="h-10 w-10 text-[#23C69A]" />,
//                   title: "Fast Processing",
//                   description: "Receive your funds in your bank account within 1-3 hours of conversion.",
//                 },
//                 {
//                   icon: <BarChart className="h-10 w-10 text-[#23C69A]" />,
//                   title: "Real-Time Rates",
//                   description: "Get the best exchange rates with real-time updates from the market.",
//                 },
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="group relative overflow-hidden rounded-xl border border-[#262626] bg-[#262626] p-6 hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#23C69A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="relative z-10">
//                     <div className="mb-4 rounded-full bg-[#23C69A]/10 p-3 w-16 h-16 flex items-center justify-center">
//                       {feature.icon}
//                     </div>
//                     <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
//                     <p className="text-gray-400">{feature.description}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* Add this right before the How It Works section */}
//         <div className="w-full h-16"></div>

//         {/* How It Works Section */}
//         <section
//           id="how-it-works"
//           className="relative py-20 md:py-32 overflow-hidden z-10 bg-[#1B1B1B]"
//           ref={howItWorksRef}
//         >
//           {/* Background elements */}
//           <div className="absolute inset-0 bg-[#262626]/20"></div>
//           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//             <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#23C69A]/10 rounded-full blur-[100px]"></div>
//             <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[#23C69A]/10 rounded-full blur-[100px]"></div>
//           </div>

//           <div className="container relative z-10">
//             <motion.div
//               initial="hidden"
//               animate={howItWorksInView ? "visible" : "hidden"}
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <motion.span
//                 variants={fadeIn}
//                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
//               >
//                 Simple Process
//               </motion.span>
//               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
//                 How Amigo Exchange Works
//               </motion.h2>
//               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
//                 Converting your crypto to fiat has never been easier. Follow these simple steps to get started.
//               </motion.p>
//             </motion.div>

//             <div className="relative">
//               {/* Vertical connection line */}
//               <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#23C69A]/0 via-[#23C69A]/50 to-[#23C69A]/0 hidden lg:block"></div>

//               {/* Steps */}
//               {[
//                 {
//                   title: "Connect Your Wallet",
//                   description:
//                     "Link your Solana wallet to Amigo Exchange with a single click. We support Phantom, Solflare, and other popular wallets.",
//                   image: "/placeholder.svg?height=300&width=400&text=Connect+Wallet",
//                   icon: <Wallet className="h-8 w-8" />,
//                 },
//                 {
//                   title: "Add Your Bank Details",
//                   description:
//                     "Enter your bank account information securely. We'll verify your account to ensure smooth transfers.",
//                   image: "/placeholder.svg?height=300&width=400&text=Bank+Details",
//                   icon: <CreditCard className="h-8 w-8" />,
//                 },
//                 {
//                   title: "Select Tokens to Convert",
//                   description:
//                     "Choose which tokens you want to convert to fiat. We support SOL, USDC, USDT, and many Solana-based tokens.",
//                   image: "/placeholder.svg?height=300&width=400&text=Select+Tokens",
//                   icon: <RefreshCw className="h-8 w-8" />,
//                 },
//                 {
//                   title: "Confirm and Receive",
//                   description:
//                     "Confirm the conversion with your PIN, and receive the funds in your bank account within 1-3 hours.",
//                   image: "/placeholder.svg?height=300&width=400&text=Confirm+Transfer",
//                   icon: <CheckCircle className="h-8 w-8" />,
//                 },
//               ].map((step, index) => (
//                 <motion.div
//                   key={index}
//                   initial="hidden"
//                   animate={howItWorksInView ? "visible" : "hidden"}
//                   variants={{
//                     hidden: { opacity: 0 },
//                     visible: {
//                       opacity: 1,
//                       transition: {
//                         delay: index * 0.2,
//                         duration: 0.6,
//                       },
//                     },
//                   }}
//                   className="mb-16 last:mb-0"
//                 >
//                   <div className="flex flex-col lg:flex-row items-center gap-8 relative">
//                     {/* Step number for mobile */}
//                     <div className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#23C69A] text-[#1B1B1B] font-bold text-xl mb-4">
//                       {index + 1}
//                     </div>

//                     {/* Left side - Image for even steps on large screens */}
//                     <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
//                       <motion.div
//                         whileHover={{ scale: 1.03 }}
//                         transition={{ duration: 0.3 }}
//                         className="relative group"
//                       >
//                         <div className="absolute -inset-1 bg-gradient-to-r from-[#23C69A]/20 to-[#23C69A]/0 rounded-xl blur-sm group-hover:blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
//                         <div className="relative rounded-xl overflow-hidden border border-[#262626] shadow-lg">
//                           <Image
//                             src={step.image || "/placeholder.svg"}
//                             alt={step.title}
//                             width={500}
//                             height={300}
//                             className="w-full h-auto object-cover"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1B] to-transparent opacity-60"></div>
//                           <div className="absolute bottom-0 left-0 right-0 p-4">
//                             <div className="flex items-center gap-2">
//                               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#23C69A] text-[#1B1B1B]">
//                                 {step.icon}
//                               </div>
//                               <span className="text-lg font-bold">Step {index + 1}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     </div>

//                     {/* Center step indicator for large screens */}
//                     <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//                       <motion.div
//                         initial={{ scale: 0 }}
//                         animate={howItWorksInView ? { scale: 1, rotate: 360 } : { scale: 0 }}
//                         transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
//                         className="flex items-center justify-center w-16 h-16 rounded-full bg-[#23C69A] text-[#1B1B1B] font-bold text-2xl border-4 border-[#1B1B1B]"
//                       >
//                         {index + 1}
//                       </motion.div>
//                     </div>

//                     {/* Right side - Content for even steps on large screens */}
//                     <div
//                       className={`w-full lg:w-1/2 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"} ${index % 2 === 0 ? "lg:pl-16" : "lg:pr-16"}`}
//                     >
//                       <motion.div
//                         variants={{
//                           hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
//                           visible: {
//                             opacity: 1,
//                             x: 0,
//                             transition: {
//                               delay: index * 0.2 + 0.2,
//                               duration: 0.5,
//                             },
//                           },
//                         }}
//                         className={`${index % 2 === 0 ? "lg:text-left" : "lg:text-right"}`}
//                       >
//                         <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
//                         <p className="text-gray-400 text-lg">{step.description}</p>

//                         {/* Animated arrow for next step */}
//                         {index < 3 && (
//                           <motion.div
//                             animate={{ y: [0, 10, 0] }}
//                             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                             className={`mt-6 hidden lg:flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
//                           >
//                             <ArrowDown className="h-8 w-8 text-[#23C69A]" />
//                           </motion.div>
//                         )}
//                       </motion.div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Final CTA */}
//             <motion.div
//               initial="hidden"
//               animate={howItWorksInView ? "visible" : "hidden"}
//               variants={{
//                 hidden: { opacity: 0, y: 30 },
//                 visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.6 } },
//               }}
//               className="mt-16 text-center"
//             >
//               <Button asChild size="lg" className="bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]">
//                 <Link href="/register">
//                   <span>Start Converting Now</span>
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>
//               </Button>
//             </motion.div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section id="testimonials" className="py-20 md:py-32" ref={testimonialsRef}>
//           <div className="container">
//             <motion.div
//               initial="hidden"
//               animate={testimonialsInView ? "visible" : "hidden"}
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <motion.span
//                 variants={fadeIn}
//                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
//               >
//                 Testimonials
//               </motion.span>
//               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
//                 What Our Users Say
//               </motion.h2>
//               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
//                 Don't just take our word for it. Here's what our users have to say about Amigo Exchange.
//               </motion.p>
//             </motion.div>

//             <motion.div
//               initial="hidden"
//               animate={testimonialsInView ? "visible" : "hidden"}
//               variants={staggerContainer}
//               className="grid md:grid-cols-3 gap-8"
//             >
//               {testimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={index}
//                   variants={fadeInUp}
//                   className="bg-[#262626] rounded-xl p-6 border border-[#262626] shadow-sm hover:shadow-md transition-shadow duration-300"
//                 >
//                   <div className="flex items-center gap-4 mb-4">
//                     <Image
//                       src={testimonial.avatar || "/placeholder.svg"}
//                       alt={testimonial.name}
//                       width={60}
//                       height={60}
//                       className="rounded-full"
//                     />
//                     <div>
//                       <h4 className="font-semibold">{testimonial.name}</h4>
//                       <p className="text-sm text-gray-400">{testimonial.role}</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-400 italic">"{testimonial.content}"</p>
//                   <div className="mt-4 flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 text-[#23C69A] fill-[#23C69A]" />
//                     ))}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section id="faq" className="py-20 md:py-32 bg-[#262626]/30" ref={faqRef}>
//           <div className="container">
//             <motion.div
//               initial="hidden"
//               animate={faqInView ? "visible" : "hidden"}
//               variants={fadeInUp}
//               className="text-center max-w-3xl mx-auto mb-16"
//             >
//               <motion.span
//                 variants={fadeIn}
//                 className="inline-flex items-center rounded-full border border-[#23C69A]/20 bg-[#23C69A]/10 px-3 py-1 text-sm font-medium text-[#23C69A] mb-4"
//               >
//                 Frequently Asked Questions
//               </motion.span>
//               <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
//                 Got Questions? We've Got Answers
//               </motion.h2>
//               <motion.p variants={fadeInUp} className="text-xl text-gray-400">
//                 Find answers to the most common questions about Amigo Exchange.
//               </motion.p>
//             </motion.div>

//             <motion.div
//               initial="hidden"
//               animate={faqInView ? "visible" : "hidden"}
//               variants={staggerContainer}
//               className="max-w-3xl mx-auto"
//             >
//               {faqItems.map((item, index) => (
//                 <motion.div key={index} variants={fadeInUp} className="mb-4 last:mb-0">
//                   <button
//                     onClick={() => toggleQuestion(index)}
//                     className={`w-full flex items-center justify-between rounded-lg border border-[#262626] p-4 text-left font-medium transition-all ${
//                       activeQuestion === index ? "bg-[#23C69A]/5 border-[#23C69A]/20" : "hover:bg-[#262626]"
//                     }`}
//                   >
//                     <span>{item.question}</span>
//                     <ChevronDown
//                       className={`h-5 w-5 transition-transform duration-200 ${
//                         activeQuestion === index ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>
//                   <div
//                     className={`overflow-hidden transition-all duration-300 ${
//                       activeQuestion === index ? "max-h-40 mt-2" : "max-h-0"
//                     }`}
//                   >
//                     <div className="p-4 rounded-lg bg-[#262626]/50">
//                       <p className="text-gray-400">{item.answer}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 md:py-32" ref={ctaRef}>
//           <div className="container">
//             <motion.div
//               initial="hidden"
//               animate={ctaInView ? "visible" : "hidden"}
//               variants={fadeInUp}
//               className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#23C69A]/80 to-[#23C69A] p-8 md:p-12"
//             >
//               <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5),transparent)]"></div>
//               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
//                 <div className="text-center md:text-left">
//                   <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-4">Ready to Convert Your Crypto?</h2>
//                   <p className="text-[#1B1B1B]/80 text-lg max-w-xl">
//                     Join thousands of users who trust Amigo Exchange for their crypto-to-fiat needs. Get started in
//                     minutes.
//                   </p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <Button size="lg" asChild className="bg-[#1B1B1B] text-white hover:bg-[#1B1B1B]/90">
//                     <Link href="/register">
//                       <span>Get Started Now</span>
//                       <ArrowRight className="ml-2 h-5 w-5" />
//                     </Link>
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </main>

//       <footer className="border-t border-[#262626] py-12 md:py-16 bg-[#1B1B1B]">
//         <div className="container">
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
//             <div className="col-span-2 lg:col-span-2">
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="text-xl font-bold text-[#23C69A]">Amigo Exchange</span>
//               </div>
//               <p className="text-gray-400 mb-4 max-w-xs">
//                 The easiest way to convert your crypto to local currency. Fast, secure, and reliable.
//               </p>
//               <div className="flex gap-4">
//                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                   <Twitter className="h-5 w-5" />
//                   <span className="sr-only">Twitter</span>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                   <Facebook className="h-5 w-5" />
//                   <span className="sr-only">Facebook</span>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                   <Instagram className="h-5 w-5" />
//                   <span className="sr-only">Instagram</span>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                   <Linkedin className="h-5 w-5" />
//                   <span className="sr-only">LinkedIn</span>
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Product</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#features" className="text-gray-400 hover:text-[#23C69A]">
//                     Features
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#how-it-works" className="text-gray-400 hover:text-[#23C69A]">
//                     How It Works
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Pricing
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Roadmap
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#testimonials" className="text-gray-400 hover:text-[#23C69A]">
//                     Testimonials
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">Support</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#faq" className="text-gray-400 hover:text-[#23C69A]">
//                     FAQ
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-[#23C69A]">
//                     Security
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-sm text-gray-400">© {new Date().getFullYear()} Amigo Exchange. All rights reserved.</p>
//             <div className="flex gap-6">
//               <Link href="/terms" className="text-sm text-gray-400 hover:text-[#23C69A]">
//                 Terms of Service
//               </Link>
//               <Link href="/privacy" className="text-sm text-gray-400 hover:text-[#23C69A]">
//                 Privacy Policy
//               </Link>
//               <Link href="/cookies" className="text-sm text-gray-400 hover:text-[#23C69A]">
//                 Cookies
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }