'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Compass, Bell, Settings, PlusCircle } from 'lucide-react';

interface SideBarProps {
  setActiveTab: (tab: string) => void;
}

export const SideBar: FC<SideBarProps> = ({ setActiveTab }) => {
  return (
    <nav className="w-64 space-y-2">
      <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('feed')}>
        <Home className="mr-2 h-4 w-4" />
        Home
      </Button>
      <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('explore')}>
        <Compass className="mr-2 h-4 w-4" />
        Explore
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Bell className="mr-2 h-4 w-4" />
        Notifications
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Button className="w-full mt-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Post
      </Button>
    </nav>
  );
};
