import React, { useState } from "react";
import "./FAQ.scss";

const faqs = [
  {
    question: "Is IV therapy safe?",
    answer:
      "Yes! All our IV therapies are administered by licensed clinicians following strict safety and hygiene protocols.",
  },
  {
    question: "How long does a session take?",
    answer:
      "Most sessions take 40–60 minutes depending on the type of drip and individual needs.",
  },
  {
    question: "Where do you provide service?",
    answer:
      "We deliver to homes, offices, hotels, gyms, and other convenient locations across Nairobi.",
  },
  {
    question: "Can pregnant women receive IV therapy?",
    answer:
      "Certain drips are safe during pregnancy. Please consult with our clinician to ensure the right treatment.",
  },
  {
    question: "How do I book a session?",
    answer:
      "You can book directly through our website or via WhatsApp/phone. Choose a package and schedule a time.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <p className="subtitle">Answers to common questions about our service</p>

      <div className="faq-list">
        {faqs.map((faq, idx) => (
          <div
            className={`faq-item ${openIndex === idx ? "open" : ""}`}
            key={idx}
            onClick={() => toggleFAQ(idx)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="faq-icon">{openIndex === idx ? "−" : "+"}</span>
            </div>
            {openIndex === idx && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
