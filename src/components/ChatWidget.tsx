"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Phone, Mail, Send, Check, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────
type MessageSender = "user" | "bot";

interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  options?: string[];
  isEmail?: boolean;
  isSummary?: boolean;
  summaryData?: LeadData;
}

interface LeadData {
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
  email: string;
}

type FlowStep = "idle" | "project_type" | "budget" | "timeline" | "description" | "email" | "summary" | "submitted" | "faq";

// ─── Constants ────────────────────────────────────────────────
const PROJECT_TYPES = [
  "Portfolio / Landing Page",
  "SaaS Platform",
  "E-Commerce Store",
  "Mobile App",
  "Custom / Other",
];

const BUDGETS = [
  "$250 – $500",
  "$500 – $1,000",
  "$1,000 – $2,000",
  "$2,000+",
];

const TIMELINES = [
  "ASAP (1–2 weeks)",
  "This Month",
  "Flexible / Exploring",
];

const FAQ_RESPONSES: Record<string, string> = {
  pricing: "Our tiers start at $250 for foundational projects, $600 for full product builds, and $1,500+ for elite custom solutions. Want to start a project?",
  cost: "Our tiers start at $250 for foundational projects, $600 for full product builds, and $1,500+ for elite custom solutions. Want to start a project?",
  time: "We pride ourselves on rapid AI deployment — most projects are delivered within days, not months. Average delivery time is under 48 hours for foundational projects.",
  long: "Foundational projects take 1–3 days. Product-level builds take 1–2 weeks. Elite projects are scoped individually.",
  contact: "You can reach us at 9642150403 or email punni.sdstudio@gmail.com anytime!",
  call: "Call us anytime at 9642150403 — we're always happy to chat!",
  hello: "Hello! 👋 How can I help you today? Want to start a project, ask a question, or see our pricing?",
  hi: "Hey there! 👋 Ready to build something amazing? I can help you get started.",
  stack: "We use Next.js, React, Python, and advanced AI agents for rapid deployment. Our frontend is hand-crafted with premium animations and glassmorphism.",
  tech: "Our stack: Next.js 15, TypeScript, Framer Motion, Tailwind CSS, Python backends, and AI-powered code generation.",
  portfolio: "Check out the site you're on! This was built with our signature 'Anti-Gravity' aesthetic. Every project gets this level of polish.",
  thanks: "You're welcome! 😊 Let me know if there's anything else I can help with.",
  thank: "Happy to help! 🙏 Feel free to reach out anytime.",
};

// ─── Component ────────────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [flowStep, setFlowStep] = useState<FlowStep>("idle");
  const [leadData, setLeadData] = useState<Partial<LeadData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for external open events (from hero CTAs, pricing buttons, etc.)
  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpenChatbot);
    return () => window.removeEventListener("open-chatbot", handleOpenChatbot);
  }, []);

  // Progress dots
  const STEPS: FlowStep[] = ["project_type", "budget", "timeline", "description", "email"];
  const currentStepIndex = STEPS.indexOf(flowStep);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial greeting when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: "greeting",
            sender: "bot",
            text: "Hey! 👋 I'm PUNNI's AI assistant. How can I help you today?",
            options: ["🚀 Start a Project", "❓ Ask a Question", "💰 See Pricing"],
          },
        ]);
        setIsTyping(false);
      }, 600);
    }
  }, [isOpen, messages.length]);

  // Hide pulse after first open
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const addBotMessage = useCallback((text: string, options?: string[], extra?: Partial<Message>) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random(),
          sender: "bot",
          text,
          options,
          ...extra,
        },
      ]);
      setIsTyping(false);
    }, 800);
  }, []);

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: "user", text },
    ]);
  }, []);

  // ─── Flow Handlers ──────────────────────────────────────────
  const handleInitialChoice = (choice: string) => {
    addUserMessage(choice);

    if (choice.includes("Start")) {
      setFlowStep("project_type");
      addBotMessage("Awesome! Let's get your project started. What type of project are you looking for?", PROJECT_TYPES);
    } else if (choice.includes("Question")) {
      setFlowStep("faq");
      addBotMessage("Sure! Ask me anything about our services, tech stack, pricing, or timelines. I'm here to help! 💬");
    } else if (choice.includes("Pricing")) {
      setFlowStep("faq");
      addBotMessage(
        "Here's a quick overview of our tiers:\n\n🏗️ **The Foundation** — $250\nPortals, portfolios, landing pages\n\n🚀 **The Product** — $600\nSaaS, creator platforms, payment flows\n\n👑 **The Elite** — $1,500+\nBespoke apps, enterprise tools\n\nWant to start a project?",
        ["🚀 Start a Project", "❓ Ask Another Question"]
      );
    }
  };

  const handleProjectType = (type: string) => {
    addUserMessage(type);
    setLeadData((prev) => ({ ...prev, project_type: type }));
    setFlowStep("budget");
    addBotMessage("Great choice! What's your budget range?", BUDGETS);
  };

  const handleBudget = (budget: string) => {
    addUserMessage(budget);
    setLeadData((prev) => ({ ...prev, budget }));
    setFlowStep("timeline");
    addBotMessage("When do you need this delivered?", TIMELINES);
  };

  const handleTimeline = (timeline: string) => {
    addUserMessage(timeline);
    setLeadData((prev) => ({ ...prev, timeline }));
    setFlowStep("description");
    addBotMessage("Almost there! Describe your vision in a few sentences. What does your product do? Who is it for? ✍️");
  };

  const handleDescription = (desc: string) => {
    addUserMessage(desc);
    setLeadData((prev) => ({ ...prev, description: desc }));
    setFlowStep("email");
    addBotMessage("Last step! What's the best email to reach you? 📧", undefined, { isEmail: true });
  };

  const handleEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addBotMessage("Hmm, that doesn't look like a valid email. Could you try again? 🤔");
      return;
    }
    addUserMessage(email);
    const finalData = { ...leadData, email } as LeadData;
    setLeadData(finalData);
    setFlowStep("summary");
    addBotMessage(
      "Here's your project summary:",
      undefined,
      { isSummary: true, summaryData: finalData }
    );
  };

  const handleFaqInput = (text: string) => {
    addUserMessage(text);
    const lower = text.toLowerCase();

    if (lower.includes("start") || lower.includes("project") || lower.includes("begin") || lower.includes("build")) {
      setFlowStep("project_type");
      addBotMessage("Let's do it! What type of project are you looking for?", PROJECT_TYPES);
      return;
    }

    const matchedKey = Object.keys(FAQ_RESPONSES).find((key) => lower.includes(key));
    if (matchedKey) {
      addBotMessage(FAQ_RESPONSES[matchedKey], ["🚀 Start a Project", "❓ Ask Another Question"]);
    } else {
      addBotMessage(
        "Great question! For detailed inquiries, you can reach us directly at punni.sdstudio@gmail.com or call 9642150403. Want to start a project instead?",
        ["🚀 Start a Project", "❓ Ask Another Question"]
      );
    }
  };

  const handleSubmit = async () => {
    if (!leadData.project_type || !leadData.budget || !leadData.timeline || !leadData.description || !leadData.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (res.ok) {
        setFlowStep("submitted");
        addBotMessage("🎉 Your project request has been submitted! We'll review it and get back to you within 24 hours. You're going to love what we build together!");
      } else {
        addBotMessage("Oops! Something went wrong. Please try again or email us at punni.sdstudio@gmail.com.");
      }
    } catch {
      addBotMessage("Couldn't connect to the server. Please email us at punni.sdstudio@gmail.com instead!");
    }
    setIsSubmitting(false);
  };

  const handleEdit = () => {
    setFlowStep("project_type");
    setLeadData({});
    addBotMessage("No problem! Let's start over. What type of project?", PROJECT_TYPES);
  };

  // ─── Unified Input Handler ─────────────────────────────────
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");

    if (flowStep === "description") {
      handleDescription(text);
    } else if (flowStep === "email") {
      handleEmail(text);
    } else if (flowStep === "faq" || flowStep === "idle") {
      handleFaqInput(text);
    }
  };

  // ─── Option Click Handler ─────────────────────────────────
  const handleOptionClick = (option: string) => {
    if (flowStep === "idle" || flowStep === "faq" || flowStep === "submitted") {
      handleInitialChoice(option);
    } else if (flowStep === "project_type") {
      handleProjectType(option);
    } else if (flowStep === "budget") {
      handleBudget(option);
    } else if (flowStep === "timeline") {
      handleTimeline(option);
    }
  };

  const canType = flowStep === "description" || flowStep === "email" || flowStep === "faq" || flowStep === "idle";

  // ─── Render ────────────────────────────────────────────────
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 w-[380px] max-w-[calc(100vw-3rem)] bg-[#0a0a0a] border border-white/15 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
            style={{ maxHeight: "550px", height: "calc(100vh - 120px)" }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-white/[0.06] to-white/[0.02] border-b border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="font-serif text-lg text-white">PUNNI Assistant</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Contact shortcuts */}
              <div className="flex gap-2">
                <a
                  href="tel:9642150403"
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
                >
                  <Phone size={11} /> Call
                </a>
                <a
                  href="mailto:punni.sdstudio@gmail.com"
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
                >
                  <Mail size={11} /> Email
                </a>
              </div>

              {/* Progress dots */}
              {currentStepIndex >= 0 && flowStep !== "summary" && flowStep !== "submitted" && (
                <div className="flex items-center gap-1.5 pt-1">
                  {STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i <= currentStepIndex
                          ? "bg-white w-6"
                          : "bg-white/20 w-3"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-white/30 ml-auto">
                    {currentStepIndex + 1}/{STEPS.length}
                  </span>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin" aria-live="polite">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-2">
                  {/* Message bubble */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-white text-black rounded-br-sm"
                          : "bg-white/[0.07] text-white/80 rounded-bl-sm border border-white/[0.08]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>

                  {/* Summary Card */}
                  {msg.isSummary && msg.summaryData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/15 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-white text-xs uppercase tracking-widest">
                        <Sparkles size={12} />
                        Project Brief
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/40">Type</span>
                          <span className="text-white">{msg.summaryData.project_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Budget</span>
                          <span className="text-white">{msg.summaryData.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Timeline</span>
                          <span className="text-white">{msg.summaryData.timeline}</span>
                        </div>
                        <div className="border-t border-white/10 pt-2">
                          <span className="text-white/40 text-xs">Description</span>
                          <p className="text-white text-sm mt-1">{msg.summaryData.description}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/40">Email</span>
                          <span className="text-white">{msg.summaryData.email}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          ) : (
                            <><Check size={14} /> Submit</>
                          )}
                        </button>
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-1.5 px-4 py-2.5 text-white/60 text-sm hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all"
                        >
                          <ArrowLeft size={14} /> Edit
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick-select options */}
                  {msg.options && !msg.isSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex flex-wrap gap-1.5 pl-1"
                    >
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="text-xs px-3 py-2 rounded-full border border-white/15 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.07] text-white/60 p-3 rounded-2xl rounded-bl-sm border border-white/[0.08] flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {canType && (
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2"
              >
                <input
                  type={flowStep === "email" ? "email" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    flowStep === "email"
                      ? "your@email.com"
                      : flowStep === "description"
                        ? "Describe your project..."
                        : "Type your question..."
                  }
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/25"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2.5 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </form>
            )}

            {/* Non-typing steps show a hint */}
            {!canType && flowStep !== "summary" && flowStep !== "submitted" && (
              <div className="p-3 border-t border-white/10 bg-black/40 text-center text-white/30 text-xs">
                ☝️ Select an option above
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className="relative w-14 h-14 bg-white text-black rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center hover:bg-gray-100 transition-colors"
      >
        {showPulse && !isOpen && (
          <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
        )}
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
}
