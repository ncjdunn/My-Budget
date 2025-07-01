// Autopay Budget PWA
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function AutopayBudgetApp() {
  const [newBill, setNewBill] = useState({ description: '', date: '', amount: '', frequency: '' });
  const [payments, setPayments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setPayments([
      { id: 1, date: '1st', amount: 58, description: "River's Dance Class", frequency: 'Monthly', monthlyImpact: 58, paid: false },
      { id: 2, date: '11th', amount: 150, description: 'Insurance', frequency: 'Monthly', monthlyImpact: 150, paid: false },
      { id: 3, date: '23rd', amount: 120, description: 'Starlink Internet', frequency: 'Monthly', monthlyImpact: 120, paid: false },
      { id: 4, date: '24th', amount: 120, description: "Dad's Mint Phone", frequency: 'Every 3 Months', monthlyImpact: 40, paid: false },
      { id: 5, date: '16th', amount: 120, description: "Jenna's Mint Phone", frequency: 'Every 3 Months', monthlyImpact: 40, paid: false },
      { id: 6, date: '21st', amount: 120, description: "Orion's Mint Phone", frequency: 'Every 3 Months', monthlyImpact: 40, paid: false },
    ]);
  }, []);

  const sortedPayments = [...payments].sort((a, b) => a.paid - b.paid);
  const paymentByDay = payments.reduce((acc, p) => {
    const d = parseInt(p.date, 10);
    if (!isNaN(d)) acc[d] = p;
    return acc;
  }, {});
  const weeklyTotals = payments.reduce((acc, p) => {
    if (!p.paid) {
      const d = parseInt(p.date, 10);
      if (!isNaN(d)) {
        const idx = Math.floor((d - 1) / 7);
        acc[idx] = (acc[idx] || 0) + p.monthlyImpact;
      }
    }
    return acc;
  }, []);

  const togglePaid = id => setPayments(prev => prev.map(p => p.id === id ? { ...p, paid: !p.paid } : p));
  const totalMonthly = payments.reduce((sum, p) => sum + (!p.paid ? p.monthlyImpact : 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 lg:p-12 flex flex-col lg:flex-row gap-8">
      {/* Disable calendar highlights */}
      <style>{`
        .react-calendar__tile--active,
        .react-calendar__tile--now,
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background: transparent !important;
          color: inherit !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Autopay Budget Tracker</h1>
        <p className="mb-6 text-center text-gray-700">Total Monthly Autopay Budget: <span className="text-blue-600 font-semibold">${totalMonthly}</span></p>
        <div className="space-y-4">
          {sortedPayments.map(p => (
            <div key={p.id} className={`p-4 rounded-lg shadow bg-white ${p.paid ? 'opacity-50 line-through' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">{p.description} - ${p.amount}</p>
                  <p className="text-sm text-gray-600 mb-2">Due: {p.date} | {p.frequency}</p>
                </div>
                <button
                  onClick={() => togglePaid(p.id)}

  ...
