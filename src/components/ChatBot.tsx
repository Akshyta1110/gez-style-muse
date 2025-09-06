import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Palette, Eye } from 'lucide-react';
import catAvatar from '@/assets/cat-avatar.png';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Mish Mish, your style buddy! 🎨 I'm here to help you with color theory, aesthetics, and all things style. What would you like to explore today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getStyleAdvice = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Color theory responses
    if (lowerMessage.includes('color') || lowerMessage.includes('colours')) {
      if (lowerMessage.includes('warm')) {
        return "Warm colors like reds, oranges, and yellows create energy and intimacy! They advance visually and make spaces feel cozy. Perfect for social areas like living rooms and dining spaces. ✨";
      }
      if (lowerMessage.includes('cool')) {
        return "Cool colors like blues, greens, and purples are calming and recede visually, making spaces feel larger. They're perfect for bedrooms and work spaces where you want tranquility! 💙";
      }
      if (lowerMessage.includes('neutral')) {
        return "Neutrals are your best friends! Beiges, grays, and whites create a timeless foundation. The 60-30-10 rule: 60% neutral base, 30% secondary color, 10% bold accent. Perfect balance! 🤍";
      }
      if (lowerMessage.includes('complementary')) {
        return "Complementary colors sit opposite on the color wheel - like red & green, blue & orange! They create vibrant contrast and visual pop. Use sparingly for maximum impact! 🎯";
      }
      return "Colors have amazing psychological effects! Warm tones energize, cool tones calm, and neutrals ground. What specific color palette are you considering? I'd love to help you choose! 🌈";
    }

    // Style and aesthetics responses
    if (lowerMessage.includes('minimalist') || lowerMessage.includes('minimal')) {
      return "Minimalism is all about 'less is more'! Focus on clean lines, functional pieces, and negative space. Stick to a neutral palette with maybe one accent color. Quality over quantity always! ✨";
    }

    if (lowerMessage.includes('cozy') || lowerMessage.includes('hygge')) {
      return "Cozy vibes are created through warm textures, soft lighting, and earthy tones! Think layered textiles, warm woods, and candlelight. Add plants for that lived-in, nurturing feel! 🕯️";
    }

    if (lowerMessage.includes('modern') || lowerMessage.includes('contemporary')) {
      return "Modern style loves clean geometry, mixed materials, and bold contrasts! Try pairing sleek metals with natural wood, or crisp whites with one dramatic accent wall. Less ornamentation, more impact! 🏢";
    }

    if (lowerMessage.includes('bohemian') || lowerMessage.includes('boho')) {
      return "Boho style is about layered textures, rich jewel tones, and collected treasures! Mix patterns confidently, add plants everywhere, and don't forget metallic accents for glamour! ✨🌿";
    }

    // General style questions
    if (lowerMessage.includes('small space') || lowerMessage.includes('tiny')) {
      return "Small spaces can feel huge with the right tricks! Use light colors to reflect light, mirrors to double visual space, and vertical storage. Multi-functional furniture is your secret weapon! 📏";
    }

    if (lowerMessage.includes('lighting')) {
      return "Lighting transforms everything! Layer your lighting: ambient (general), task (functional), and accent (mood). Warm light (2700K-3000K) feels cozy, cool light (4000K+) energizes! 💡";
    }

    // Default responses with style tips
    const defaultResponses = [
      "That's an interesting style question! Remember, the best spaces reflect your personality. What aesthetic speaks to your soul? 💫",
      "Style is so personal! I love helping people discover their unique aesthetic. Tell me more about what inspires you! 🎨",
      "Great question! The key to any beautiful space is balance - between colors, textures, and proportions. What area are you styling? ✨",
      "I'm excited to help with your style journey! Every beautiful space starts with understanding what makes you feel happy and peaceful. 🏡"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getStyleAdvice(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto max-w-4xl p-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src={catAvatar} 
              alt="Mish Mish Avatar" 
              className="w-12 h-12 rounded-full shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mish Mish</h1>
              <p className="text-muted-foreground text-sm">Your style buddy</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span>Color Theory Expert</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Aesthetic Advisor</span>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="bg-chat-background border-border shadow-xl">
          <div className="h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {!message.isUser && (
                      <img 
                        src={catAvatar} 
                        alt="Mish Mish" 
                        className="w-8 h-8 rounded-full mt-1 shadow-sm"
                      />
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-chat-user text-chat-user-foreground shadow-md'
                          : 'bg-chat-bot text-chat-bot-foreground shadow-sm border border-border'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <img 
                      src={catAvatar} 
                      alt="Mish Mish" 
                      className="w-8 h-8 rounded-full mt-1 shadow-sm"
                    />
                    <div className="bg-chat-bot text-chat-bot-foreground px-4 py-3 rounded-2xl border border-border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about colors, aesthetics, or style..."
                  className="flex-1 rounded-full border-2 focus:border-primary transition-colors"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="rounded-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Mish Mish specializes in color theory, interior design, and aesthetic advice ✨
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatBot;