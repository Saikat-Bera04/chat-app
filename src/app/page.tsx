"use client";

import { useState, useEffect } from 'react';
import UnlockScreen from '@/components/unlock-screen';
import ChatScreen from '@/components/chat-screen';
import { Heart } from 'lucide-react';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const isUnlocked = localStorage.getItem('secret-heartbeat-unlocked') === 'true';
      setUnlocked(isUnlocked);
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
    setLoading(false);
  }, []);

  const handleUnlock = () => {
    try {
      localStorage.setItem('secret-heartbeat-unlocked', 'true');
    } catch (error) {
       console.error("Could not access localStorage", error);
    }
    setUnlocked(true);
  };
  
  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center h-screen bg-background text-primary">
        <Heart className="w-24 h-24 animate-pulse" />
      </main>
    );
  }

  return (
    <main>
      {unlocked ? <ChatScreen /> : <UnlockScreen onUnlock={handleUnlock} />}
    </main>
  );
}
