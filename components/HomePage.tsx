'use client';

import { useState } from 'react';
import { NavBar } from '@/components/NavBar'
import { Sidebar } from '@/components/ui/sidebar';
import { Footer } from '@/components/Footer';
import { Feed } from '@/components/Feed';

export const HomePageComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('feed');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-6 flex gap-6">
        <Sidebar/>
        <div className="flex-1">
          {activeTab === 'feed' && <Feed />}
          {/* Add Explore Component here when ready */}
        </div>
      </main>
      <Footer />
    </div>
  );
};
