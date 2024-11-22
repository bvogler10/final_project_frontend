'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Footer } from '@/components/Footer';
import { Feed } from '@/components/Feed';

export const HomePageComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('feed');

  return (
    <div className="flex-1 bg-background">
      {/* Main content area */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'feed' && <Feed />}
        {/* Add Explore Component here when ready */}
      </div>
    </div>
  );
};
