// ============================================================================
// CONTEXT : CMSContext.jsx
// ROLE : Editable Platform Content (Navbar, Footer, Legal, Contact & Newsletter)
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";

const CMSContext = createContext();

export const CMSProvider = ({ children }) => {
  const [cms, setCms] = useState(() => {
    const saved = localStorage.getItem("moexpress_cms");
    return saved
      ? JSON.parse(saved)
      : {
          navbar: {
            announcement: "Free Shipping on orders over $10 | 100% Buyer Protection Escrow Guarantee",
            brandName: "MoExpress",
            brandSub: "MARKETPLACE",
            slogan: "Shop More, Live Better!",
          },
          footer: {
            copyright: "© 2026 MoExpress MARKETPLACE. All rights reserved.",
            aboutText:
              "Shop More, Live Better! Your world, one cart away! Discover millions of quality products at wholesale prices directly from certified suppliers.",
            contactPhone: "+213 (0) 23 45 67 89",
            contactEmail: "support@moexpress.com",
          },
          legal: {
            terms: "Welcome to MoExpress MARKETPLACE. By using our platform, buyers and sellers agree to strictly adhere to international e-commerce regulations, accurate product descriptions, and fair pricing.",
            privacy: "Your privacy and security are paramount. MoExpress encrypts all personal credentials, payment tokens, and communications using modern SSL standards and secure JWT sessions.",
            cookies: "We use essential cookies to persist your cart, active currency selections, theme preferences, and 9-language locale settings for a seamless shopping experience.",
            refunds: "All purchases on MoExpress are protected by 100% Buyer Protection. If an item is defective or not received, submit a dispute claim in our Conflict Center within 30 days for a full refund.",
            intellectual: "MoExpress MARKETPLACE, its orange shopping bag logo, and slogan 'Shop More, Live Better!' are protected brand assets.",
          },
          contact: {
            title: "Contact MoExpress Customer Care",
            subtitle: "Have a question or need assistance? Reach out to our 24/7 dedicated support team.",
          },
          newsletter: {
            title: "Subscribe to Our VIP Newsletter",
            subtitle: "Get exclusive deals, new arrival alerts, and weekly coin promo codes sent directly to your inbox.",
          },
        };
  });

  useEffect(() => {
    localStorage.setItem("moexpress_cms", JSON.stringify(cms));
  }, [cms]);

  const updateCMSSection = (section, data) => {
    setCms((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  return <CMSContext.Provider value={{ cms, updateCMSSection }}>{children}</CMSContext.Provider>;
};

export const useCMS = () => useContext(CMSContext);
