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
    <main className="min-vh-100 bg-light text-dark ">
      <div className="container-fluid">
     {view === 'form' ? <TransactionForm /> : <SettlementResults />}
     </div>
     </main>

  );
}

export default App;