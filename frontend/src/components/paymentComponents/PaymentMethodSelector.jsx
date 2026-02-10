import React from 'react'
// src/components/payment/PaymentMethodSelector.jsx
const PaymentMethodSelector = ({ method, setMethod }) => (
  <div className="payment-methods">
    <button onClick={() => setMethod("mpesa")} className={method === "mpesa" ? "active" : ""}>
      📱 M-Pesa
    </button>
    <button onClick={() => setMethod("card")} className={method === "card" ? "active" : ""}>
      💳 Card
    </button>
    <button onClick={() => setMethod("cash")} className={method === "cash" ? "active" : ""}>
      💵 Cash
    </button>
  </div>
);

export default PaymentMethodSelector;

