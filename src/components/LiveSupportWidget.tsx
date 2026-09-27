import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Headphones, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LiveSupportWidget: React.FC = () => {
  const { user, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: `Hello ${user.name}! Welcome to PLEX 24/7 VIP Customer Support. How can we assist you with your deposit, withdrawal, or media tasks today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqOptions = [
    { q: "How to complete Deposit?", a: "To deposit real money, click 'DEPOSIT' on the home dashboard, choose your gateway (bKash/Nagad/Rocket/Bank), perform the transfer, and submit your Transaction ID (TrxID). Our financial audit team will credit your wallet within 5-15 mins." },
    { q: "Why is my Withdrawal pending?", a: "Withdrawal requests are processed in under 2 hours. Our auditing team manually verifies the security pin and banking logs. If there are any delays, please ensure your account credentials are bound correctly." },
    { q: "How to increase daily commission?", a: "You can upgrade your VIP tier by funding your account package. Higher VIP tiers unlock larger review commissions (up to 0.5% - 2.5% per snatched movie review) and additional daily review quotas." },
    { q: "How to recover Honor Score?", a: "If your honor score falls, complete daily check-ins and fulfill all pending review order submissions. Once you maintain a healthy account for 3 consecutive days, your score restores automatically." }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string, isUser: boolean = true) => {
    if (!text.trim()) return;

    const newMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Trigger simulated agent response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Thank you for contacting PLEX Media Support. A live financial agent has been notified and will verify your request shortly. Please feel free to select one of the common topics above for instant help.";
      
      // Smart keyword replies
      const lower = text.toLowerCase();
      if (lower.includes('deposit') || lower.includes('recharge') || lower.includes('money') || lower.includes('cash in')) {
        replyText = "Deposits are manually verified. Make sure you transfer real money to our official wallet and submit your TrxID via the 'DEPOSIT' screen. Once verified by our finance operator, your balance credits immediately.";
      } else if (lower.includes('withdraw') || lower.includes('cash out') || lower.includes('payout')) {
        replyText = "All withdrawals are processed securely via manual release. Make sure your e-wallet (bKash) or bank account details are correctly bound, and you have submitted your 6-digit withdrawal PIN correctly.";
      } else if (lower.includes('task') || lower.includes('review') || lower.includes('snatch')) {
        replyText = "Tasks commission rate is determined by your VIP tier. Complete up to 25 or 30 tasks daily to withdraw your total earnings. High-multiplier vouchers (12x, 3x) are randomly distributed in the pool.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const handleFaqClick = (faq: { q: string; a: string }) => {
    // Add user question
    const userMsg = {
      sender: 'user' as const,
      text: faq.q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Agent reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: faq.a,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 select-none">
      
      {/* 1. Floating Support Trigger Circle (With active notification ping) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-tr from-[#f5c518] to-amber-500 hover:from-amber-400 hover:to-amber-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/20 border-4 border-white cursor-pointer transition-all transform hover:scale-105 active:scale-95 animate-bounce"
          title="Open Live Chat Support"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border border-white text-[8px] font-black text-white items-center justify-center">1</span>
          </span>
          <Headphones className="w-6 h-6 text-black" />
        </button>
      )}

      {/* 2. Chat Box Window Dialog */}
      {isOpen && (
        <div className="w-[330px] sm:w-[360px] bg-slate-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-200">
          
          {/* Header section (Cyberpunk Live Agent Header) */}
          <div className="bg-[#1a2338] px-4 py-3 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 bg-[#f5c518] rounded-full flex items-center justify-center border border-amber-400">
                  <Headphones className="w-5 h-5 text-black" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">PLEX LIVE HELP</h4>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span>Support Officer Active</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full cursor-pointer hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ / Topics Section */}
          <div className="bg-[#121824] px-3.5 py-2.5 border-b border-neutral-800 text-left">
            <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest block mb-1.5 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-[#f5c518]" />
              <span>Click for Instant Assistance:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto no-scrollbar">
              {faqOptions.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFaqClick(faq)}
                  className="bg-[#161c24] hover:bg-[#1f2635] text-[10px] text-gray-300 px-2 py-1 rounded-md border border-neutral-800 transition-colors text-left cursor-pointer truncate max-w-[170px]"
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto p-4 space-y-3 bg-[#0c1017] scrollbar-thin text-left">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1 mb-0.5 text-[9px] text-gray-500 font-bold uppercase font-mono">
                  <span>{m.sender === 'user' ? user.name : 'Platform Agent'}</span>
                  <span>·</span>
                  <span>{m.time}</span>
                </div>
                
                <div
                  className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed max-w-[85%] font-medium ${
                    m.sender === 'user'
                      ? 'bg-amber-400 text-black rounded-tr-none font-bold'
                      : 'bg-neutral-800 text-gray-100 rounded-tl-none border border-neutral-700/50'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <span className="text-[9px] text-gray-500 font-bold uppercase font-mono mb-0.5">Agent is writing...</span>
                <div className="bg-neutral-800 border border-neutral-700/50 px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form message input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="p-3 bg-[#111622] border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask support officer..."
              className="flex-1 bg-[#0c1017] border border-neutral-800 rounded-full px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 placeholder-gray-500 font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 bg-amber-400 hover:bg-amber-500 disabled:opacity-40 text-black rounded-full flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
