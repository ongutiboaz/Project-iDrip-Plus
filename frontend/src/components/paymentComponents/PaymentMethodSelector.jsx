import React from 'react'
const PaymentMethodSelector = ({ method, setMethod }) => {
  return (
    <div className="payment-methods">
      <button
        className={method === "mpesa" ? "active" : ""}
        onClick={() => setMethod("mpesa")}
      >
        📱 M-Pesa
      </button>

      <button
        className={method === "card" ? "active" : ""}
        onClick={() => setMethod("card")}
      >
        💳 Card
      </button>
    </div>
  );
};

export default PaymentMethodSelector;
