import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Search, Bell, MessageSquare, User } from 'lucide-react'

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <Link href="/" className="text-2xl font-bold text-purple-600">CrochetSocial</Link>
      <div className="flex items-center space-x-4">
        <Input type="text" placeholder="Search..." className="w-64" />
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Home className="h-5 w-5" />
          <span className="sr-only">Explore</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </nav>
  )
}

