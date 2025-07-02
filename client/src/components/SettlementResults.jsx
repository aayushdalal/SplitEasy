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
      <div
        className="position-relative container py-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh', zIndex: 1 }}
      >
        <div
          className="p-4 rounded shadow w-100"
          style={{
            maxWidth: '600px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <h1 className="text-center fw-bold text-dark mb-3">
            Final Settlements
          </h1>
          <p className="text-center text-muted mb-4">
            Here's the simplest way to settle all the group debts.
          </p>

          <div>
            {settlements.length === 0 ? (
              <p className="text-center fs-5 text-success">
                🎉 All debts are settled! 🎉
              </p>
            ) : (
              <div className="list-group">
                {settlements.map((s, index) => (
                  <div
                    key={index}
                    className="list-group-item list-group-item-action d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start"
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '500',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                    }}
                  >
                    <div className="mb-2 mb-sm-0">
                      <span className="fw-bold text-danger">{s.from}</span>
                      <span className="mx-2 text-dark">→</span>
                      <span className="fw-bold text-primary">{s.to}</span>
                    </div>
                    <span className="badge bg-success fs-5 px-4 py-2">
                      Rs {s.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleResettle}
            className="btn btn-primary mt-4 w-100"
          >
            Settle New Expenses (Start Over)
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettlementResults;
