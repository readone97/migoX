// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import {
//   ArrowDownUp,
//   ArrowUpRight,
//   ChevronDown,
//   Clock,
//   DollarSign,
//   FileText,
//   Filter,
//   LogOut,
//   RefreshCw,
//   Search,
//   Settings,
//   User,
//   Wallet,
// } from "lucide-react"

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/hooks/use-toast"
// import { NotificationsPopover } from "@/components/notifications-popover"
// import { MerchantTransactionTable } from "@/components/merchant-transaction-table"
// import { MerchantTransactionDetails } from "@/components/merchant-transaction-details"
// import { Label } from "@/components/ui/label"


// export default function MerchantDashboardPage() {
//   const { toast } = useToast()
//   const [activeTab, setActiveTab] = useState("pending")
//   const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null)
//   const [showTransactionDetails, setShowTransactionDetails] = useState(false)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [dateRange, setDateRange] = useState("today")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterStatus, setFilterStatus] = useState("all")
//   const [showFilterDialog, setShowFilterDialog] = useState(false)
//   const [filters, setFilters] = useState({
//     dateFrom: "",
//     dateTo: "",
//     minAmount: "",
//     maxAmount: "",
//     currency: "all",
//     bankName: "",
//   })

//   // Stats
//   const [stats, setStats] = useState({
//     pendingCount: 12,
//     completedCount: 87,
//     totalVolume: "₦15,750,000",
//     todayVolume: "₦1,250,000",
//     balance: {
//       usdt: "5,000",
//       usdc: "7,500",
//       sol: "25",
//     },
//   })

//   // Mock data for transactions
//   const [transactions, setTransactions] = useState([
//     {
//       id: "TX123456",
//       userId: "user123",
//       userName: "John Doe",
//       fromAmount: "500",
//       fromCurrency: "USDT",
//       toAmount: "775,000",
//       toCurrency: "NGN",
//       bankName: "Access Bank",
//       accountNumber: "0123456789",
//       accountName: "John Doe",
//       status: "pending",
//       createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
//       updatedAt: null,
//       notes: "",
//     },
//     {
//       id: "TX123457",
//       userId: "user456",
//       userName: "Sarah Johnson",
//       fromAmount: "1,000",
//       fromCurrency: "USDC",
//       toAmount: "1,545,000",
//       toCurrency: "NGN",
//       bankName: "Guaranty Trust Bank",
//       accountNumber: "1234567890",
//       accountName: "Sarah Johnson",
//       status: "pending",
//       createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
//       updatedAt: null,
//       notes: "",
//     },
//     {
//       id: "TX123458",
//       userId: "user789",
//       userName: "Michael Chen",
//       fromAmount: "2.5",
//       fromCurrency: "SOL",
//       toAmount: "387,500",
//       toCurrency: "NGN",
//       bankName: "Zenith Bank",
//       accountNumber: "2345678901",
//       accountName: "Michael Chen",
//       status: "pending",
//       createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
//       updatedAt: null,
//       notes: "",
//     },
//     {
//       id: "TX123459",
//       userId: "user101",
//       userName: "Oluwaseun Adeyemi",
//       fromAmount: "750",
//       fromCurrency: "USDT",
//       toAmount: "1,162,500",
//       toCurrency: "NGN",
//       bankName: "First Bank",
//       accountNumber: "3456789012",
//       accountName: "Oluwaseun Adeyemi",
//       status: "completed",
//       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
//       updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
//       notes: "Transfer completed via bank app",
//     },
//     {
//       id: "TX123460",
//       userId: "user202",
//       userName: "Amina Ibrahim",
//       fromAmount: "1,200",
//       fromCurrency: "USDC",
//       toAmount: "1,854,000",
//       toCurrency: "NGN",
//       bankName: "Access Bank",
//       accountNumber: "4567890123",
//       accountName: "Amina Ibrahim",
//       status: "completed",
//       createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
//       updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
//       notes: "Customer confirmed receipt",
//     },
//   ])
  
//   const handleViewTransaction = (transactionId: string) => {
//     setSelectedTransaction(transactionId)
//     setShowTransactionDetails(true)
//   }

//   const handleProcessTransaction = (transactionId: string) => {
//     setIsProcessing(true)

//     // Simulate API call to process transaction
//     setTimeout(() => {
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((tx) =>
//           tx.id === transactionId
//             ? {
//                 ...tx,
//                 status: "completed",
//                 updatedAt: new Date().toISOString(),
//                 notes: "Processed by merchant",
//               }
//             : tx,
//         ),
//       )

//       // Update stats
//       setStats((prev) => ({
//         ...prev,
//         pendingCount: prev.pendingCount - 1,
//         completedCount: prev.completedCount + 1,
//       }))

//       setIsProcessing(false)
//       setShowTransactionDetails(false)
//        // Get SOL balance
//   useEffect(() => {
//     const fetchBalance = async () => {
//       if (!publicKey) return;

//       try {
//         setIsLoading(true);
//         const connection = new Connection(RPC_ENDPOINT, "confirmed");
//         const balance = await connection.getBalance(publicKey);
//         setSolBalance(balance / LAMPORTS_PER_SOL);
//       } catch (error) {
//         console.error("Error fetching balance:", error);
//         toast({
//           title: "Error",
//           description: "Failed to fetch wallet balance. Please try again.",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (connected) {
//       fetchBalance();
//       // Set up a refresh interval (every 10 seconds)
//       const interval = setInterval(fetchBalance, 10000);
//       return () => clearInterval(interval);
//     } else {
//       setSolBalance(null);
//     }
//   }, [publicKey, connected, toast]);

 

//       toast({
//         title: "Transaction Processed",
//         description: `Transaction ${transactionId} has been successfully processed.`,
//         variant: "default",
//       })
//     }, 2000)
//   }

//   const handleRejectTransaction = (transactionId: string, reason: string) => {
//     setIsProcessing(true)

//     // Simulate API call to reject transaction
//     setTimeout(() => {
//       setTransactions((prevTransactions) =>
//         prevTransactions.map((tx) =>
//           tx.id === transactionId
//             ? {
//                 ...tx,
//                 status: "rejected",
//                 updatedAt: new Date().toISOString(),
//                 notes: `Rejected: ${reason}`,
//               }
//             : tx,
//         ),
//       )

//       // Update stats
//       setStats((prev) => ({
//         ...prev,
//         pendingCount: prev.pendingCount - 1,
//       }))

//       setIsProcessing(false)
//       setShowTransactionDetails(false)

//       toast({
//         title: "Transaction Rejected",
//         description: `Transaction ${transactionId} has been rejected.`,
//         variant: "destructive",
//       })
//     }, 2000)
//   }

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({ ...prev, [name]: value }))
//   }

//   const applyFilters = () => {
//     toast({
//       title: "Filters Applied",
//       description: "Transaction list has been filtered according to your criteria.",
//     })
//     setShowFilterDialog(false)
//   }

//   const resetFilters = () => {
//     setFilters({
//       dateFrom: "",
//       dateTo: "",
//       minAmount: "",
//       maxAmount: "",
//       currency: "all",
//       bankName: "",
//     })
//     toast({
//       title: "Filters Reset",
//       description: "All filters have been cleared.",
//     })
//   }

//   const filteredTransactions = transactions.filter((tx) => {
//     // Filter by status
//     if (activeTab === "pending" && tx.status !== "pending") return false
//     if (activeTab === "completed" && tx.status !== "completed") return false
//     if (activeTab === "rejected" && tx.status !== "rejected") return false

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       return (
//         tx.id.toLowerCase().includes(query) ||
//         tx.userName.toLowerCase().includes(query) ||
//         tx.accountName.toLowerCase().includes(query) ||
//         tx.accountNumber.includes(query)
//       )
//     }

//     return true
//   })

//   const getSelectedTransaction = () => {
//     return transactions.find((tx) => tx.id === selectedTransaction) || null
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-background text-foreground">
//       <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Link href="/" className="text-xl font-bold text-primary">
//               Amigo Exchange <span className="text-sm font-normal text-muted-foreground">Merchant</span>
//             </Link>
//           </div>
//           <nav className="flex items-center gap-4">
//             <NotificationsPopover />

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-2">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src="/placeholder.svg?height=32&width=32&text=ME" alt="Merchant" />
//                     <AvatarFallback>ME</AvatarFallback>
//                   </Avatar>
//                   <div className="flex flex-col items-start text-sm">
//                     <span>Merchant</span>
//                     <span className="text-xs text-muted-foreground">Admin</span>
//                   </div>
//                   <ChevronDown className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   Settings
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </nav>
//         </div>
//       </header>

//       <main className="flex-1 py-8">
//         <div className="container">
//           <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
//               <p className="text-muted-foreground">Manage and process user crypto-to-fiat conversions</p>
//             </div>
//             <div className="flex flex-wrap gap-4">
//               <Button variant="outline">
//                 <FileText className="mr-2 h-4 w-4" />
//                 Export Report
//               </Button>
//               <Button>
//                 <RefreshCw className="mr-2 h-4 w-4" />
//                 Refresh Data
//               </Button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">Pending Transactions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="text-2xl font-bold">{stats.pendingCount}</div>
//                   <div className="rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
//                     <Clock className="h-4 w-4" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground">Requires your action</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">Completed Today</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="text-2xl font-bold">{stats.completedCount}</div>
//                   <div className="rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
//                     <ArrowDownUp className="h-4 w-4" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground">Successfully processed</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">Total Volume</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="text-2xl font-bold">{stats.totalVolume}</div>
//                   <div className="rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
//                     <DollarSign className="h-4 w-4" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground">All time</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">Today's Volume</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="text-2xl font-bold">{stats.todayVolume}</div>
//                   <div className="rounded-full bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
//                     <ArrowUpRight className="h-4 w-4" />
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground">Last 24 hours</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Merchant Balance */}
//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle>Merchant Balance</CardTitle>
//               <CardDescription>Your current crypto balance for processing transactions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-6 md:grid-cols-3">
//                 <div className="flex items-center justify-between rounded-lg border p-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">USDT Balance</p>
//                     <p className="text-2xl font-bold">{stats.balance.usdt}</p>
//                   </div>
//                   <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
//                     <DollarSign className="h-5 w-5" />
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between rounded-lg border p-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">USDC Balance</p>
//                     <p className="text-2xl font-bold">{stats.balance.usdc}</p>
//                   </div>
//                   <div className="rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
//                     <DollarSign className="h-5 w-5" />
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between rounded-lg border p-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">SOL Balance</p>
//                     <p className="text-2xl font-bold">{stats.balance.sol}</p>
//                   </div>
//                   <div className="rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
//                     <Wallet className="h-5 w-5" />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Transactions */}
//           <div className="mt-8">
//             <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <TabsList className="mb-4 md:mb-0">
//                   <TabsTrigger value="pending">
//                     Pending
//                     <Badge variant="outline" className="ml-2">
//                       {stats.pendingCount}
//                     </Badge>
//                   </TabsTrigger>
//                   <TabsTrigger value="completed">Completed</TabsTrigger>
//                   <TabsTrigger value="rejected">Rejected</TabsTrigger>
//                   <TabsTrigger value="all">All Transactions</TabsTrigger>
//                 </TabsList>
//                 <div className="flex flex-wrap gap-2">
//                   <div className="relative">
//                     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                     <Input
//                       placeholder="Search transactions..."
//                       className="pl-8 w-[250px]"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>
//                   <Select defaultValue="today" value={dateRange} onValueChange={setDateRange}>
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Select date range" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="today">Today</SelectItem>
//                       <SelectItem value="yesterday">Yesterday</SelectItem>
//                       <SelectItem value="week">Last 7 days</SelectItem>
//                       <SelectItem value="month">Last 30 days</SelectItem>
//                       <SelectItem value="custom">Custom range</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <Button variant="outline" size="icon" onClick={() => setShowFilterDialog(true)}>
//                     <Filter className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               <TabsContent value="pending" className="mt-6">
//                 <MerchantTransactionTable
//                   transactions={filteredTransactions}
//                   onViewTransaction={handleViewTransaction}
//                 />
//               </TabsContent>

//               <TabsContent value="completed" className="mt-6">
//                 <MerchantTransactionTable
//                   transactions={filteredTransactions}
//                   onViewTransaction={handleViewTransaction}
//                 />
//               </TabsContent>

//               <TabsContent value="rejected" className="mt-6">
//                 <MerchantTransactionTable
//                   transactions={filteredTransactions}
//                   onViewTransaction={handleViewTransaction}
//                 />
//               </TabsContent>

//               <TabsContent value="all" className="mt-6">
//                 <MerchantTransactionTable
//                   transactions={filteredTransactions}
//                   onViewTransaction={handleViewTransaction}
//                 />
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </main>

//       {/* Filter Dialog */}
//       <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Filter Transactions</DialogTitle>
//             <DialogDescription>Set criteria to filter the transaction list</DialogDescription>
//           </DialogHeader>

//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="dateFrom">Date From</Label>
//                 <Input
//                   id="dateFrom"
//                   name="dateFrom"
//                   type="date"
//                   value={filters.dateFrom}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="dateTo">Date To</Label>
//                 <Input id="dateTo" name="dateTo" type="date" value={filters.dateTo} onChange={handleFilterChange} />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="minAmount">Min Amount</Label>
//                 <Input
//                   id="minAmount"
//                   name="minAmount"
//                   type="number"
//                   placeholder="0"
//                   value={filters.minAmount}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="maxAmount">Max Amount</Label>
//                 <Input
//                   id="maxAmount"
//                   name="maxAmount"
//                   type="number"
//                   placeholder="Any"
//                   value={filters.maxAmount}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="currency">Currency</Label>
//               <select
//                 id="currency"
//                 name="currency"
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                 value={filters.currency}
//                 onChange={handleFilterChange}
//               >
//                 <option value="all">All Currencies</option>
//                 <option value="usdt">USDT</option>
//                 <option value="usdc">USDC</option>
//                 <option value="sol">SOL</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="bankName">Bank Name</Label>
//               <Input
//                 id="bankName"
//                 name="bankName"
//                 placeholder="Any bank"
//                 value={filters.bankName}
//                 onChange={handleFilterChange}
//               />
//             </div>
//           </div>

//           <DialogFooter className="sm:justify-between">
//             <Button variant="outline" type="button" onClick={resetFilters}>
//               Reset Filters
//             </Button>
//             <Button type="button" onClick={applyFilters}>
//               Apply Filters
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Transaction Details Dialog */}
//       <Dialog open={showTransactionDetails} onOpenChange={setShowTransactionDetails}>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Transaction Details</DialogTitle>
//             <DialogDescription>Review transaction details and process the payment</DialogDescription>
//           </DialogHeader>

//           <MerchantTransactionDetails
//             transaction={getSelectedTransaction()}
//             onProcess={handleProcessTransaction}
//             onReject={handleRejectTransaction}
//             isProcessing={isProcessing}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

