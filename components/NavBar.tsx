'use client';

import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export const NavBar: FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">CrochetKnitSocial</h1>
        <div className="flex items-center space-x-4">
          <Input className="w-64" placeholder="Search patterns, users, or posts" />
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
