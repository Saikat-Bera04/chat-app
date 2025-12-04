"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"

const SECRET_CODE = "1234";

interface UnlockScreenProps {
  onUnlock: () => void;
}

export default function UnlockScreen({ onUnlock }: UnlockScreenProps) {
  const [code, setCode] = useState('');
  const { toast } = useToast()

  const handleUnlock = () => {
    if (code === SECRET_CODE) {
      onUnlock();
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect Code",
        description: "The secret code is not correct. Please try again.",
      })
      setCode('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-sm mx-4 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Secret Heartbeat</CardTitle>
          <CardDescription>Enter the secret code to continue</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input 
            type="password"
            placeholder="••••••••"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyPress}
            className="text-center"
          />
          <Button onClick={handleUnlock}>
            Unlock
            <Heart className="ml-2 h-4 w-4 fill-current" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
