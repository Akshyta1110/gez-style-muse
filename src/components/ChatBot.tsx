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

  const getStyleAdvice = (userMessage: string, conversationHistory: Message[]): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Advanced color theory analysis
    const analyzeColorRequest = () => {
      // Specific color mentions
      if (lowerMessage.includes('red')) {
        return `Red is powerful and passionate! In design, it stimulates appetite (great for dining rooms) and creates urgency. Pair with neutrals like cream or sage green for balance. Consider burgundy for sophistication or coral for warmth. Red advances visually, so use it strategically as an accent rather than dominant color. What's the mood you're going for? 🔴`;
      }
      if (lowerMessage.includes('blue')) {
        return `Blue is the ultimate calming color! Navy creates sophistication and pairs beautifully with brass accents. Powder blue opens up spaces and works with whites and grays. Teal adds personality while staying serene. Blue recedes visually, making rooms feel larger. For productivity, try deeper blues - they enhance focus and creativity. What shade of blue speaks to you? 💙`;
      }
      if (lowerMessage.includes('green')) {
        return `Green is nature's healing color! Sage green is incredibly trendy - it's calming yet sophisticated. Forest green adds drama and works with gold accents. Mint refreshes spaces beautifully. Green reduces eye strain and promotes balance. It's perfect for bedrooms and workspaces. Pro tip: green works with almost any other color! What type of space are you greening? 🌿`;
      }
      if (lowerMessage.includes('yellow')) {
        return `Yellow is sunshine in a room! It stimulates creativity and happiness but can be overwhelming if overused. Soft buttery yellows create warmth without being jarring. Mustard yellow is sophisticated and pairs with navy or charcoal. Use yellow in spaces where you want energy - kitchens, entryways, creative spaces. Always test yellow in different lights! ☀️`;
      }
      if (lowerMessage.includes('purple') || lowerMessage.includes('lavender')) {
        return `Purple is luxury and creativity combined! Lavender is calming and perfect for bedrooms. Deep eggplant creates drama and sophistication. Purple stimulates imagination - great for creative spaces. Pair with silver, gray, or soft yellows. Fun fact: purple was historically associated with royalty because the dye was so expensive! 💜`;
      }
      if (lowerMessage.includes('pink')) {
        return `Pink isn't just feminine - it's scientifically proven to be calming! Dusty rose and blush tones are incredibly sophisticated. Pink works beautifully with navy, forest green, or charcoal. It adds warmth without being aggressive like red. Baker-Miller pink actually reduces aggression - that's why some prisons use it! What style are you considering? 🌸`;
      }
      if (lowerMessage.includes('orange')) {
        return `Orange is energy and enthusiasm! It stimulates appetite and conversation - perfect for social spaces. Terracotta and burnt orange are earthy and sophisticated. Peach softens the intensity while keeping warmth. Orange pairs beautifully with blue (complementary) or with creams and browns. Use it where you want to encourage social interaction! 🧡`;
      }
      return null;
    };

    // Advanced aesthetic style analysis
    const analyzeStyleRequest = () => {
      if (lowerMessage.includes('scandinavian') || lowerMessage.includes('nordic')) {
        return `Scandinavian design is about 'lagom' - just the right amount! Think light woods (birch, pine), whites, and cozy textures. Add one dramatic black element for contrast. The key is functionality meets beauty - every piece should serve a purpose. Natural light is crucial - keep windows unobstructed. Incorporate hygge elements like candles and soft throws for warmth in the minimal palette. 🕯️`;
      }
      if (lowerMessage.includes('industrial')) {
        return `Industrial style celebrates raw materials! Exposed brick, steel beams, concrete floors - it's urban and edgy. Balance hard materials with warm woods and soft textiles. Edison bulb lighting is iconic but ensure proper task lighting too. Color palette: charcoal, rust, warm grays with black accents. Add plants to soften the hardness - greenery creates beautiful contrast! 🏭`;
      }
      if (lowerMessage.includes('farmhouse') || lowerMessage.includes('rustic')) {
        return `Modern farmhouse is cozy elegance! Shiplap, barn doors, and wide-plank floors create the foundation. Color palette: whites, creams, soft grays with natural wood tones. Mix vintage finds with new pieces. The key is 'collected over time' feeling - not matchy-matchy. Add galvanized metals, mason jars, and fresh flowers. Comfort is paramount! 🚜`;
      }
      if (lowerMessage.includes('mediterranean')) {
        return `Mediterranean style is warm and inviting! Think terra cotta, deep blues, and sun-washed whites. Wrought iron details, mosaic tiles, and natural stone create authenticity. Use warm metals like bronze and copper. Incorporate arches and curved lines - they're signature elements. Add olive branches, ceramics, and textured fabrics. It's about bringing outdoor living inside! 🌊`;
      }
      if (lowerMessage.includes('art deco')) {
        return `Art Deco is glamour and geometric boldness! Rich jewel tones like emerald, sapphire, and gold. Geometric patterns, mirrored surfaces, and luxe materials like velvet and marble. Lighting is dramatic - think chandeliers and sconces. Add metallic accents in gold or brass. The style celebrates optimism and luxury - every element should feel intentional and glamorous! ✨`;
      }
      if (lowerMessage.includes('maximalist')) {
        return `Maximalism is 'more is more' done right! It's about intentional abundance - every piece should bring you joy. Layer patterns boldly but keep a cohesive color story. Use the 'triangle rule' - repeat colors in three places around the room. Gallery walls, collected treasures, rich textures - it's about personality over perfection. The key is confidence! 🎨`;
      }
      return null;
    };

    // Check for specific color requests first
    const colorAdvice = analyzeColorRequest();
    if (colorAdvice) return colorAdvice;

    // Check for style requests
    const styleAdvice = analyzeStyleRequest();
    if (styleAdvice) return styleAdvice;

    // Advanced color theory concepts
    if (lowerMessage.includes('complementary')) {
      return `Complementary colors create the strongest contrast! Red-green, blue-orange, yellow-purple. They're opposite on the color wheel and make each other 'pop.' Use the 80/20 rule - one color dominates, the complementary is the accent. Too much creates visual chaos. Try split-complementary (one color plus the two adjacent to its complement) for gentler contrast. What colors are you considering? 🎯`;
    }

    if (lowerMessage.includes('analogous')) {
      return `Analogous colors are neighbors on the color wheel - they create harmony! Like blue, blue-green, and green. These schemes are pleasing and serene because they occur naturally. Choose one dominant color, use the second as support, and the third as accent. Perfect for creating calm, cohesive spaces. Ocean blues and greens, or sunset oranges and reds work beautifully! 🌈`;
    }

    if (lowerMessage.includes('monochromatic')) {
      return `Monochromatic = one color in all its variations! Different tints (adding white), shades (adding black), and tones (adding gray) of the same hue. It's sophisticated and calming but can be boring without texture variation. Add visual interest through different materials - matte, glossy, rough, smooth. Include a tiny pop of complementary color for life! 🎨`;
    }

    if (lowerMessage.includes('triadic')) {
      return `Triadic colors are evenly spaced on the color wheel - like red, blue, yellow! They're vibrant and energetic but need careful balance. Use one as dominant, others as accents. It's bold and playful - great for creative spaces or children's rooms. For sophistication, choose muted versions of triadic colors rather than pure hues. 🔺`;
    }

    // Lighting and ambiance
    if (lowerMessage.includes('lighting') || lowerMessage.includes('light')) {
      return `Lighting is the secret sauce of great design! Layer it: ambient (general mood), task (functionality), and accent (highlighting features). Color temperature matters - 2700K is warm and cozy, 3000K is comfortable, 4000K+ is energizing but can feel clinical. Dimmers are essential! Natural light changes throughout the day, so test your colors at different times. Golden hour makes everything beautiful! 💡`;
    }

    // Spatial concerns
    if (lowerMessage.includes('small space') || lowerMessage.includes('tiny') || lowerMessage.includes('compact')) {
      return `Small spaces are about smart design tricks! Light colors reflect light and feel spacious. Mirrors strategically placed double visual space - across from windows is perfect. Vertical storage draws the eye up. Multi-functional furniture is key. Use the same color on walls and ceiling to blur boundaries. One dramatic element prevents boring - maybe a bold accent wall or stunning light fixture! 📏`;
    }

    // Pattern and texture advice
    if (lowerMessage.includes('pattern') || lowerMessage.includes('texture')) {
      return `Patterns and textures add soul to spaces! Mix scales - large, medium, small patterns together. Use the 'odd number rule' - group patterns in threes or fives. Texture is pattern you can feel - rough jute, smooth velvet, nubby bouclé. They add visual interest even in neutral spaces. When mixing patterns, keep one element consistent - color, scale, or style. Confidence is key! 🧶`;
    }

    // Personalized contextual responses based on conversation
    const recentTopics = conversationHistory.slice(-3).map(msg => msg.content.toLowerCase()).join(' ');
    
    if (recentTopics.includes('bedroom')) {
      return `For bedrooms, I always recommend the psychology of color! Blues and greens promote restful sleep - they lower heart rate and blood pressure. Avoid bright reds or oranges which are too stimulating. Soft, muted tones create serenity. Consider blackout options and layered lighting for different moods. What's your ideal bedroom feeling - cozy cocoon or serene spa? 🛏️`;
    }

    if (recentTopics.includes('kitchen')) {
      return `Kitchens are the heart of the home! Warm colors stimulate appetite - reds, oranges, warm yellows. But they also need to feel clean and fresh, so balance with whites or cool neutrals. Good task lighting is crucial for food prep. Consider the 'kitchen triangle' - stove, sink, fridge should be easily accessible. What's your cooking style - chef's paradise or casual family hub? 👨‍🍳`;
    }

    // Sophisticated default responses
    const contextualResponses = [
      `Color psychology is fascinating! Every hue affects our emotions and behaviors differently. What specific feeling are you trying to create in your space? I can suggest colors that naturally evoke that mood. 🧠`,
      
      `The golden ratio appears in the most beautiful designs! It's about proportions that feel naturally pleasing. Are you working on furniture arrangement, color proportions, or overall room layout? 📐`,
      
      `Biophilic design is so important - humans need connection to nature! Even in urban spaces, we can add natural textures, organic shapes, and living elements. How can we bring nature into your design? 🌿`,
      
      `Cultural color meanings are so rich! Red means luck in China but danger in the West. Blue is calming universally but can mean sadness or trust. What cultural or personal associations do colors have for you? 🌍`,
      
      `The 60-30-10 rule is design gold! 60% dominant neutral, 30% secondary color, 10% bold accent. It creates perfect balance. Are you struggling with color proportions in your space? ⚖️`,
    ];

    // Choose response based on message sentiment and complexity
    if (lowerMessage.length > 50) {
      // Longer, more detailed question
      return contextualResponses[0];
    }
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
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

    // Simulate AI thinking time with more realistic delay for complex responses
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getStyleAdvice(inputValue, messages),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
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