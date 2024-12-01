"use client"

import { useState } from 'react';
import { PostList } from './pages/explore/PostList';
import { Home, Compass } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

export const HomePageComponent = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <main className="flex-1 container mx-auto py-6 bg-background text-foreground">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="feed" className="flex items-center justify-center px-4 py-2 rounded-lg data-[state=active]:bg-primary 
    data-[state=active]:text-primary-foreground 
    data-[state=inactive]:bg-card 
    data-[state=inactive]:text-muted-foreground">
            <Home className="h-4 w-4 mr-2" />
            Following
          </TabsTrigger>
          <TabsTrigger value="explore" className="flex items-center justify-center px-4 py-2 rounded-lg data-[state=active]:bg-primary 
    data-[state=active]:text-primary-foreground 
    data-[state=inactive]:bg-card 
    data-[state=inactive]:text-muted-foreground">
            <Compass className="h-4 w-4 mr-2" />
            Explore
          </TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="mt-6">
        <div className="h-[calc(100vh-12rem)] overflow-y-auto">
              <PostList endpoint="/api/posts" />
         </div>
        </TabsContent>
        <TabsContent value="explore" className="mt-6">
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
              <PostList endpoint="/api/posts" />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
