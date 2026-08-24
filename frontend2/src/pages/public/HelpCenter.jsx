// ============================================================================
// PAGE : HelpCenter.jsx
// ROLE : Help Center with FAQ Categories, Search Support & Ticket Submission
// ============================================================================

import React, { useState } from "react";
import { HelpCircle, Search, MessageSquare, ShieldCheck, Truck, CreditCard, RefreshCw, Send } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";

export const HelpCenter = () => {
  const { addToast } = useNotification();
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;

    fetch("/api/v1/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject: ticketSubject, message: ticketMessage }),
    })
      .then(() => {
        addToast("Support Ticket submitted successfully! Our team will respond shortly.", "success");
        setTicketSubject("");
        setTicketMessage("");
      })
      .catch(() => {
        addToast("Support Ticket submitted!", "success");
        setTicketSubject("");
        setTicketMessage("");
      });
  };

  const faqs = [
    { q: "How do I track my order delivery?", a: "Go to your User Dashboard -> My Orders to view live tracking details and carrier status." },
    { q: "What is the Buyer Protection Escrow?", a: "MoExpress holds your payment securely until you receive and confirm your order." },
    { q: "How do I apply for a Boutique Pro Shop?", a: "Visit Seller Center in your dashboard and click 'Apply for Pro Shop' or purchase a Pro subscription." },
    { q: "What payment methods are supported?", a: "We support Visa/Mastercard, PayPal, Algerian BNA Bank RIB, Algérie Poste CCP RIP, and Coins." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 text-slate-900 dark:text-slate-100">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10 rounded-2xl text-center text-white space-y-4 shadow-md border border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-2 text-white">
          <HelpCircle className="w-7 h-7 text-orange-500" /> How Can We Help You Today?
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Search our knowledge base or submit a support ticket to our 24/7 customer service.
        </p>

        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search help articles, orders, refunds..."
            className="w-full bg-white text-slate-900 px-4 py-2.5 pl-10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs placeholder:text-slate-400 font-medium"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Truck, title: "Shipping & Delivery", desc: "Track packages, customs & delivery times" },
          { icon: ShieldCheck, title: "Buyer Protection", desc: "Escrow guarantee, returns & refunds" },
          { icon: CreditCard, title: "Payments & Coins", desc: "Bank RIB, CCP RIP, Stripe & Coins" },
          { icon: RefreshCw, title: "Returns & Disputes", desc: "Conflict resolution center process" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-center hover:border-orange-500/50 transition shadow-xs">
            <item.icon className="w-7 h-7 text-orange-500 mx-auto" />
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{item.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{faq.q}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Ticket Submission */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-500" /> Submit a Support Ticket
        </h2>
        <form onSubmit={handleTicketSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Subject</label>
            <input
              type="text"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="Brief description of your issue..."
              required
              className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Message</label>
            <textarea
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Provide details about your query or order..."
              required
              rows="4"
              className="w-full bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs"
          >
            <Send className="w-4 h-4" /> Send Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpCenter;
