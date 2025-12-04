"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'gf';
  timestamp: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<'me' | 'gf'>('me');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('secret-heartbeat-messages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('secret-heartbeat-messages', JSON.stringify(messages));
    } catch (error) {
      console.error("Could not access localStorage", error);
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      sender: currentUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prevMessages => [...prevMessages, message]);
    setNewMessage('');
  };
  
  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-card border-x">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <Heart className="w-8 h-8 text-primary animate-heart-pulse" />
        <h1 className="text-xl font-headline">Secret Heartbeat</h1>
        <div className="flex items-center space-x-2">
            <Label htmlFor="user-switch" className="text-sm">{currentUser === 'me' ? 'You' : 'Her'}</Label>
            <Switch
                id="user-switch"
                checked={currentUser === 'gf'}
                onCheckedChange={(checked) => setCurrentUser(checked ? 'gf' : 'me')}
                aria-label="Switch user for sending messages"
            />
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex items-end gap-2 animate-in fade-in-0 zoom-in-95 duration-300',
              msg.sender === 'me' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.sender === 'gf' && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">H</AvatarFallback>
                </Avatar>
            )}
            <div
              className={cn(
                'max-w-xs md:max-w-sm rounded-lg px-4 py-2 shadow-sm',
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-muted-foreground rounded-bl-none'
              )}
            >
              <p className="text-sm break-words">{msg.text}</p>
              <p className={cn("text-xs opacity-70 mt-1", msg.sender === 'me' ? 'text-primary-foreground' : 'text-muted-foreground' )}>{msg.timestamp}</p>
            </div>
            {msg.sender === 'me' && (
                <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">Y</AvatarFallback>
                </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-4 border-t bg-background/80 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
          />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
