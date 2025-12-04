import { HeartCrack } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <HeartCrack className="w-24 h-24 text-primary mb-4" />
      <h1 className="text-4xl font-headline mb-2">You are offline</h1>
      <p className="text-lg text-muted-foreground">Please check your internet connection to use the app.</p>
    </div>
  );
}
