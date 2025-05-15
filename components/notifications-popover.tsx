"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const notifications = [
  {
    id: "1",
    title: "Your deposit has been credited",
    description: "Your deposit of $500 has been successfully credited to your account.",
    time: "5 minutes ago",
  },
  {
    id: "2",
    title: "Conversion Successful",
    description: "You have successfully converted 1 SOL to 100 USDC.",
    time: "30 minutes ago",
  },
  {
    id: "3",
    title: "New feature available",
    description: "Check out the new crypto swap feature!",
    time: "1 hour ago",
  },
]

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleMarkAsRead = (id: string) => {
    toast({
      title: "Notification Marked as Read",
      description: `Notification ${id} has been marked as read.`,
    })
  }

  const handleClearAll = () => {
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been cleared.",
    })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">View notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="flex items-center justify-between px-4 py-2">
          <h4 className="text-sm font-medium">Notifications</h4>
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            Mark all as read
          </Button>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="max-h-[300px] flex-1">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="group relative">
                <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                  </div>
                </DropdownMenuItem>
                <Separator />
              </div>
            ))
          ) : (
            <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">No notifications</div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

