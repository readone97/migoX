"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { ChevronDown, LogOut, Menu, Settings, X } from "lucide-react"
import { NotificationsPopover } from "@/components/notifications-popover"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardHeader() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Overview", path: "/dashboard" },
    { name: "Swap", path: "/swap" },
    { name: "Convert", path: "/convert" },
    { name: "History", path: "/history" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/amigo-logo.png" 
              alt="Amigo Exchange" 
              width={140} 
              height={40} 
              className="h-8 w-auto" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "hover:text-primary text-foreground hover:border-b-2 hover:border-primary/40 pb-1"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <NotificationsPopover />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{user?.email || "User"}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    {user?.email || "User"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button 
                    className="flex w-full items-center px-4 py-3 text-sm font-medium hover:bg-muted rounded-md text-red-500" 
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] pr-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {user?.email?.[0]?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user?.email || "User"}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-1 py-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.path) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto border-t pt-4">
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                  >
                    {user?.email || "User"}
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-sm font-medium hover:bg-muted rounded-md"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Link>
                  <button 
                    className="flex w-full items-center px-4 py-3 text-sm font-medium hover:bg-muted rounded-md text-red-500" 
                    onClick={() => {
                      signOut()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

