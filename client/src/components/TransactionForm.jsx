// src/components/TransactionForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalTransaction, calculateSettlements, clearAllTransactions } from '../features/transactions/transactionSlice';

function TransactionForm() {
  const [groupMembers, setGroupMembers] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const dispatch = useDispatch();
  const { localTransactions, status } = useSelector((state) => state.transactions);
  
  const membersArray = groupMembers.split(',').map(name => name.trim()).filter(name => name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !paidBy || membersArray.length === 0) {
      alert("Please fill out all fields, including group members.");
      return;
    }
    const newTransaction = { description, amount: Number(amount), paidBy, paidFor: membersArray };
    dispatch(addLocalTransaction(newTransaction));
    setDescription('');
    setAmount('');
    setPaidBy('');
  };

  const handleCalculate = () => {
    if (localTransactions.length > 0) {
      dispatch(calculateSettlements(localTransactions));
    }
  };

  const handleClear = () => {
    dispatch(clearAllTransactions());
  };

  return (
  <div className="py-12 px-4 max-w-3xl mx-auto space-y-10">
    <header className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Group Expense Calculator</h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Add your group and expenses, then calculate who owes whom.</p>
    </header>

    {/* Define Group */}
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 space-y-2 border border-slate-200 dark:border-slate-600">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">1. Define Your Group</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">Enter names separated by commas.</p>
      <input
        type="text"
        value={groupMembers}
        onChange={(e) => setGroupMembers(e.target.value)}
        placeholder="e.g., Alice, Bob, Charlie"
        className="p-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>

    {/* Add Expense */}
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 space-y-4 border border-slate-200 dark:border-slate-600">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">2. Add a New Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Expense (e.g., Dinner)"
          className="p-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="p-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="" disabled>Who Paid?</option>
          {membersArray.map(member => <option key={member} value={member}>{member}</option>)}
        </select>
      </div>
      <button type="submit" disabled={membersArray.length === 0}
        className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
        Add Expense
      </button>
    </form>

    {/* Current Expenses */}
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-600">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">3. Current Expenses</h2>
      <div className="space-y-3">
        {localTransactions.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No expenses added yet.</p>
        ) : (
          localTransactions.map((t, index) => (
            <div key={index} className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 p-3 rounded-lg border border-slate-200 dark:border-slate-500">
              <p className="text-slate-700 dark:text-white">
                <span className="font-semibold">{t.paidBy}</span> paid for "{t.description}"
              </p>
              <p className="font-bold text-lg text-slate-800 dark:text-green-300">${t.amount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-col md:flex-row gap-4">
      <button onClick={handleCalculate} disabled={status === 'loading' || localTransactions.length === 0}
        className="flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
        {status === 'loading' ? 'Calculating...' : 'Calculate Settlement'}
      </button>
      <button onClick={handleClear} disabled={localTransactions.length === 0}
        className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed">
        Clear All
      </button>
    </div>
  </div>
);

}
export default TransactionForm;