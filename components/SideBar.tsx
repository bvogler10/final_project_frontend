import { Button } from "@/components/ui/button"
import { RibbonIcon as Yarn, Scissors, Book, Users, Bookmark, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="sticky top-0 w-64 bg-white border-r h-screen p-4">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Yarn className="mr-2 h-4 w-4" />
          My Projects
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Scissors className="mr-2 h-4 w-4" />
          Patterns
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Book className="mr-2 h-4 w-4" />
          Tutorials
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Groups
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Bookmark className="mr-2 h-4 w-4" />
          Saved
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </aside>
  )
}

