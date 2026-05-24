"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Phone, Mail, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: "1", sender: "bot", text: "Hi there! I'm the PUNNI Studio AI assistant. How can I help you today?" }
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let botResponse = "Thank you for reaching out! We will get back to you shortly.";
      
      if (lowerInput.includes("pricing") || lowerInput.includes("cost")) {
        botResponse = "Our engineering tiers start at ₹25,000 for foundational projects and go up depending on complexity. Check out our Engineering Tiers section for details!";
      } else if (lowerInput.includes("time") || lowerInput.includes("long")) {
        botResponse = "We pride ourselves on rapid AI deployment, collapsing timelines from months to days. Most core platforms take just a few weeks.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("call")) {
        botResponse = "You can call us anytime at 9642150403 or email punni.sdstudio@gmail.com.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = "Hello! How can I assist you with your digital product today?";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: botResponse },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] bg-[#0f0f0f] border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "500px", height: "calc(100vh - 120px)" }}
          >
            {/* Header / Contact Info */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg text-white">Connect with us</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:9642150403" 
                  className="flex items-center gap-2 text-sm text-chalk hover:text-white transition-colors bg-white/5 p-2 rounded-lg"
                >
                  <Phone size={14} className="text-white/60" />
                  Free Call: 9642150403
                </a>
                <a 
                  href="mailto:punni.sdstudio@gmail.com" 
                  className="flex items-center gap-2 text-sm text-chalk hover:text-white transition-colors bg-white/5 p-2 rounded-lg"
                >
                  <Mail size={14} className="text-white/60" />
                  punni.sdstudio@gmail.com
                </a>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-white text-black rounded-br-sm" 
                        : "bg-white/10 text-chalk rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-chalk p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-gray-200 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}
