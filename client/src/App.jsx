// src/App.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import TransactionForm from './components/TransactionForm';
import SettlementResults from './components/SettlementResults';

function App() {
  const { view } = useSelector((state) => state.transactions);

  // Set the global background and font for the entire app.
  // The 'font-sans' class will apply the 'Inter' font we just configured.
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {view === 'form' ? <TransactionForm /> : <SettlementResults />}
    </main>
  );
}

export default App;