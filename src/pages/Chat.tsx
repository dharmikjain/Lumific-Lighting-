import { useState, useEffect, useRef } from 'react';
import { getAIResponse, getInitialGreeting } from '../utils/chatService';
import { quickQuestions } from '../utils/chatQuestions';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with greeting
  useEffect(() => {
    const initialMessage: Message = {
      id: '0',
      text: getInitialGreeting(),
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Get AI response
    try {
      const aiResponseText = await getAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const TypingIndicator = () => (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#C9A835',
          animation: 'bounce 1.4s infinite',
        }}
      />
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#C9A835',
          animation: 'bounce 1.4s infinite',
          animationDelay: '0.2s',
        }}
      />
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#C9A835',
          animation: 'bounce 1.4s infinite',
          animationDelay: '0.4s',
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 40px 40px',
        background: 'linear-gradient(135deg, #060606 0%, #0f0f0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '600px' }}>
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '48px',
            fontWeight: 300,
            color: '#f5f0e8',
            marginBottom: '12px',
            letterSpacing: '-1px',
          }}
        >
          AI <span style={{ color: '#C9A835' }}>Lighting</span> Assistant
        </h1>
        <p style={{ color: '#777', fontSize: '14px', letterSpacing: '1px' }}>
          Ask about products, specifications, quotations, and more
        </p>
      </div>

      {/* Quick Questions - Show before chat opens */}
      {messages.length === 1 && (
        <div
          style={{
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '10px',
            maxWidth: '700px',
            width: '100%',
          }}
        >
          {quickQuestions.slice(0, 6).map((question, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(question.query);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              style={{
                padding: '10px 14px',
                backgroundColor: 'rgba(201, 168, 53, 0.08)',
                border: '1px solid rgba(201, 168, 53, 0.2)',
                borderRadius: '6px',
                color: '#d4d4d8',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                transition: 'all 0.2s',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201, 168, 53, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(201, 168, 53, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.2)';
              }}
            >
              {question.label}
            </button>
          ))}
        </div>
      )}

      {/* Chat Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          height: '600px',
          background: 'rgba(15, 15, 15, 0.8)',
          border: '1px solid rgba(201, 168, 53, 0.15)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Messages Area */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor:
                    msg.sender === 'user'
                      ? '#C9A835'
                      : 'rgba(201, 168, 53, 0.1)',
                  border:
                    msg.sender === 'user'
                      ? 'none'
                      : '1px solid rgba(201, 168, 53, 0.2)',
                  color: msg.sender === 'user' ? '#fff' : '#d4d4d8',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  wordWrap: 'break-word',
                  animation: 'fadeIn 0.3s ease-in',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(201, 168, 53, 0.1)',
                  border: '1px solid rgba(201, 168, 53, 0.2)',
                }}
              >
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid rgba(201, 168, 53, 0.12)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !isLoading) {
                handleSend();
              }
            }}
            placeholder="Ask about our lighting solutions..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '10px 14px',
              border: '1px solid rgba(201, 168, 53, 0.2)',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              color: '#d4d4d8',
              fontSize: '14px',
              outline: 'none',
              fontFamily: '"DM Sans", sans-serif',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.5)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.2)';
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: isLoading || !input.trim() ? '#666' : '#C9A835',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              fontFamily: '"DM Sans", sans-serif',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.backgroundColor = '#e8c84a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.backgroundColor = '#C9A835';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
