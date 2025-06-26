// src/components/SettlementResults.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearLocal } from '../features/transactions/transactionSlice';

function SettlementResults() {
  const { settlements } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const handleResettle = () => {
    dispatch(clearLocal());
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Final Settlements</h1>
          <p className="mt-2 text-lg text-slate-600">Here's the simplest way to settle all the group debts.</p>
        </header>
        
        <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 mb-8">
          <div className="space-y-5">
            {settlements.length === 0 ? (
              <p className="text-center text-slate-500 py-8 text-lg">🎉 All debts are settled! 🎉</p>
            ) : (
              settlements.map((s, index) => (
                 <div
                   key={index}
                   className="p-5 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border border-slate-200 hover:shadow-lg transition-shadow"
                 >
                   <div className="text-center sm:text-left flex items-center gap-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                     <span className="font-bold text-lg text-red-600">{s.from}</span>
                     <span className="mx-2 text-slate-500 text-xl">→</span>
                     <span className="font-bold text-lg text-blue-700">{s.to}</span>
                   </div>
                   <div className="bg-green-100 text-green-800 font-bold text-xl py-2 px-6 rounded-full shadow-inner border border-green-200">
                     ${s.amount.toFixed(2)}
                   </div>
                 </div>
               ))
            )}
          </div>
        </div>

        <button onClick={handleResettle} className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          Settle New Expenses (Start Over)
        </button>
      </div>
    </div>
  );
}
export default SettlementResults;