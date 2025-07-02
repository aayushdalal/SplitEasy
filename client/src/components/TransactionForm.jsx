import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addLocalTransaction,
  calculateSettlements,
  clearAllTransactions,
} from '../features/transactions/transactionSlice';

function TransactionForm() {
  const [groupMembers, setGroupMembers] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const dispatch = useDispatch();
  const { localTransactions, status } = useSelector(
    (state) => state.transactions
  );

  const membersArray = groupMembers
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !paidBy || membersArray.length === 0) {
      alert('Please fill out all fields, including group members.');
      return;
    }
    const newTransaction = {
      description,
      amount: Number(amount),
      paidBy,
      paidFor: membersArray,
    };
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
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: 'url("/images/trans.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Optional overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 }}
      ></div>

      <div
        className="container position-relative p-4 rounded shadow"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          maxWidth: '700px',
          zIndex: 2,
        }}
      >
        <header className="text-center mb-4">
          <h1 className="fw-bold">Group Expense Calculator</h1>
        </header>

        {/* Group Input */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Group Members</label>
          <input
            type="text"
            value={groupMembers}
            onChange={(e) => setGroupMembers(e.target.value)}
            placeholder="Enter names seprated by comma's"
            className="form-control"
          />
        </div>

        {/* Transaction Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Expense Description"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <select
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                className="form-select"
              >
                <option value="" disabled>
                  Who Paid?
                </option>
                {membersArray.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={membersArray.length === 0}
          >
            Add Expense
          </button>
        </form>

        {/* Current Expenses */}
        <div className="mb-4">
          <h5 className="fw-semibold">Current Expenses</h5>
          <div className="list-group">
            {localTransactions.length === 0 ? (
              <p className="text-muted">No expenses added yet.</p>
            ) : (
              localTransactions.map((t, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <strong>{t.paidBy}</strong> paid for "{t.description}"
                  </span>
                  <span className="fw-bold text-success"> Rs {t.amount.toFixed(2)} </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3">
          <button
            onClick={handleCalculate}
            disabled={status === 'loading' || localTransactions.length === 0}
            className="btn btn-success flex-fill"
          >
            {status === 'loading' ? 'Calculating...' : 'Calculate Settlement'}
          </button>
          <button
            onClick={handleClear}
            disabled={localTransactions.length === 0}
            className="btn btn-danger flex-fill"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
