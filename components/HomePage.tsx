'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Footer } from '@/components/Footer';
import { PostList } from './pages/explore/PostList';

export const HomePageComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('feed');

  return (
    <div className="flex-1 w-full bg-background">
      {/* Main content area */}
      <div className="px-4 py-6">
        <PostList/>
      </div>
    </div>
  );
};
