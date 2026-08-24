// ============================================================================
// CONTEXT : CurrencyContext.jsx
// ROLE : Multi-Currency System with Country Flags (EUR 🇪🇺, DZD 🇩🇿, USD 🇺🇸, GBP 🇬🇧, SAR 🇸🇦, TRY 🇹🇷, RUB 🇷🇺)
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from "react";

export const DEFAULT_RATES = {
  EUR: { symbol: "€", flag: "🇪🇺", rate: 1.0, label: "EUR - Euro" },
  DZD: { symbol: "DA", flag: "🇩🇿", rate: 225.0, label: "DZD - Dinar Algérien" },
  USD: { symbol: "$", flag: "🇺🇸", rate: 1.08, label: "USD - US Dollar" },
  GBP: { symbol: "£", flag: "🇬🇧", rate: 0.85, label: "GBP - British Pound" },
  SAR: { symbol: "SR", flag: "🇸🇦", rate: 4.05, label: "SAR - Saudi Riyal" },
  TRY: { symbol: "₺", flag: "🇹🇷", rate: 35.20, label: "TRY - Turkish Lira" },
  RUB: { symbol: "₽", flag: "🇷🇺", rate: 98.50, label: "RUB - Russian Ruble" },
};

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => localStorage.getItem("moexpress_currency") || "EUR");
  const [rates, setRates] = useState(DEFAULT_RATES);

  useEffect(() => {
    localStorage.setItem("moexpress_currency", currency);
  }, [currency]);

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    if (!token) return;

    fetch("/api/v1/admin/settings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data && data.success && data.data?.exchangeRates) {
          setRates((prev) => {
            const updated = { ...prev };
            Object.keys(data.data.exchangeRates).forEach((code) => {
              if (updated[code]) {
                updated[code].rate = data.data.exchangeRates[code].rate || updated[code].rate;
              }
            });
            return updated;
          });
        }
      })
      .catch(() => {});
  }, []);

  const formatPrice = (amountInEUR) => {
    const numericAmount = Number(amountInEUR) || 0;
    const activeCurrency = rates[currency] || DEFAULT_RATES.EUR;
    const converted = (numericAmount * activeCurrency.rate).toFixed(2);
    return `${activeCurrency.flag} ${converted} ${activeCurrency.symbol}`;
  };

  const currencies = Object.keys(rates).map((code) => ({
    code,
    symbol: rates[code].symbol,
    flag: rates[code].flag,
    label: rates[code].label,
    rate: rates[code].rate,
  }));

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const getActiveFlag = () => (rates[currency] || DEFAULT_RATES.EUR).flag;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currentCurrency: currency,
        setCurrency,
        changeCurrency,
        rates,
        setRates,
        currencies,
        formatPrice,
        getActiveFlag,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
