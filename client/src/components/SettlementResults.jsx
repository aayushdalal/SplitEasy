import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearLocal } from '../features/transactions/transactionSlice';

function SettlementResults() {
  const { settlements } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailMap, setEmailMap] = useState({});
  const [upiId, setUpiId] = useState('');

  const handleResettle = () => {
    dispatch(clearLocal());
  };

  const uniqueNames = [...new Set(settlements.flatMap(s => [s.from, s.to]))];

  const handleSendEmails = async () => {
    const participants = Object.entries(emailMap).map(([name, email]) => ({ name, email }));

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/send-settlements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participants, settlements, upiId }),
    });

    const data = await res.json();
    alert(data.message);
    if (data.success) setShowEmailForm(false);
  };

  return (
    <div
      className="position-relative"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/settle.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      ></div>

      {/* Main content */}
      <div className="position-relative container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div
          className="bg-light bg-opacity-75 p-4 rounded shadow w-100"
          style={{ maxWidth: '700px', backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <h1 className="text-center fw-bold text-dark mb-3">Final Settlements</h1>
          <p className="text-center text-muted">
            Here's the simplest way to settle all the group debts.
          </p>

          <div className="mt-4">
            {settlements.length === 0 ? (
              <p className="text-center fs-5 text-success">
                🎉 All debts are settled! 🎉
              </p>
            ) : (
              <div className="list-group">
                {settlements.map((s, index) => (
                  <div
                    key={index}
                    className="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
                  >
                    <div className="fs-5 mb-2 mb-md-0">
                      <span className="fw-bold text-danger">{s.from}</span>
                      <span className="mx-2 text-secondary">→</span>
                      <span className="fw-bold text-primary">{s.to}</span>
                    </div>
                    <span className="badge bg-success fs-5 px-3 py-2">
                      ₹{s.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleResettle} className="btn btn-primary mt-4 w-100">
            Settle New Expenses (Start Over)
          </button>

          {settlements.length > 0 && (
            <button onClick={() => setShowEmailForm(true)} className="btn btn-success w-100 mt-3">
              Send Settlements via Email
            </button>
          )}
        </div>
      </div>

      {/* Email Form Modal */}
      {showEmailForm && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
          <div className="bg-white p-4 rounded" style={{ maxWidth: '600px', width: '90%' }}>
            <h4 className="mb-3 text-center">Enter Participant Emails</h4>
            {uniqueNames.map((name) => (
              <div key={name} className="mb-2">
                <label className="fw-bold">{name}</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={emailMap[name] || ''}
                  onChange={(e) => setEmailMap({ ...emailMap, [name]: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="fw-bold">UPI ID or Phone Number for Payment</label>
              <input
                type="text"
                placeholder="Enter UPI ID or Phone"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="form-control"
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button onClick={handleSendEmails} className="btn btn-primary w-50 me-2">
                Send Emails
              </button>
              <button onClick={() => setShowEmailForm(false)} className="btn btn-danger w-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettlementResults;
