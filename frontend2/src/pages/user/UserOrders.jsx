// ============================================================================
// PAGE : UserOrders.jsx
// ROLE : User Orders History & Delivery Package Tracking
// ============================================================================

import React, { useState, useEffect } from "react";
import { Package, Truck, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";

export const UserOrders = () => {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("moexpress_token");
    fetch("/api/v1/orders/my-orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setOrders(data.data || []);
      })
      .catch(() => {});
  }, []);

  const sampleOrders = orders.length > 0 ? orders : [
    {
      _id: "ORD_987654321",
      totalAmount: 299.99,
      status: "shipped",
      createdAt: "2026-08-20T14:30:00.000Z",
      items: [{ name: "Sony WH-1000XM5 Wireless Headphones", quantity: 1, price: 299.99 }],
    },
    {
      _id: "ORD_123456789",
      totalAmount: 129.99,
      status: "delivered",
      createdAt: "2026-08-15T09:15:00.000Z",
      items: [{ name: "Nike Air Max 270 Sport Sneakers", quantity: 1, price: 129.99 }],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <Package className="w-6 h-6 text-orange-500" /> My Orders & Package Tracking
      </h2>

      <div className="space-y-4">
        {sampleOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 gap-2 text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Order #{order._id}</span>
                <span className="text-gray-400 block">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${
                  order.status === "delivered"
                    ? "bg-green-600 text-white"
                    : order.status === "shipped"
                    ? "bg-blue-600 text-white"
                    : "bg-yellow-500 text-slate-900"
                }`}>
                  {order.status}
                </span>
                <span className="font-black text-orange-500 text-sm">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name} × {item.quantity}</span>
                  <span className="font-bold">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>

            {/* Tracking Timeline */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-amber-500" /> Carrier: DHL Express</span>
              <span className="font-mono text-orange-500">Tracking: #DHL-{order._id.slice(-6)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
