import React, { useState, useEffect} from "react";
import "./index.css";
 
const FAQ = () => {
  const [open, setOpen] = useState(null);

  useEffect(() => {
          document.title = "FAQ - Annapurna Farms";
  }, []);
 
  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };
 
  const faqs = [
    {
      id: 1,
      question: "How does Annapurna Farms ensure product quality?",
      answer:
        "We maintain quality by using fresh, natural ingredients sourced directly from farms. Each product is processed using traditional methods to retain its natural essence and undergoes strict quality checks to meet our standards.",
    },
    {
      id: 2,
      question: "Are Annapurna Farms products free from additives?",
      answer:
        "Yes, our products are 100% natural, free from artificial colors, flavors, or preservatives. We believe in offering pure, authentic products that reflect the quality of our farms.",
    },
    {
      id: 3,
      question: "Is there a quality guarantee for Annapurna Farms products?",
      answer:
        "We stand by our commitment to quality. If you encounter any issues with our products, please contact us for assistance. We are dedicated to ensuring our customers receive only the highest quality products.",
    },
    {
      id: 4,
      question: "Are Annapurna Farms products made with natural ingredients?",
      answer:
        "Yes, all our products are made with 100% natural ingredients, free from artificial additives and preservatives. We believe in providing pure, wholesome products that reflect the true essence of farm-fresh produce.",
    },
    {
      id: 5,
      question: "Are Annapurna Farms products organic?",
      answer:
        "While our products are not certified organic, we use natural farming methods without synthetic chemicals. We focus on sustainability and purity, providing products that are natural and responsibly grown.",
    },
    {
      id: 6,
      question: "How quickly can I expect my order to arrive?",
      answer:
        "Once your order is confirmed, it typically takes 3-5 business days for delivery within India. We work with trusted delivery partners to ensure your order arrives promptly and in optimal condition.",
    },
    {
      id: 7,
      question: "Can I track my order after purchasing?",
      answer:
        "Yes, after placing an order, you’ll receive a confirmation email with a tracking link. You can use this link to monitor the status and estimated delivery time of your order.",
    },
    {
      id: 8,
      question: "Does Annapurna Farms offer bulk orders?",
      answer:
        "Yes, we welcome bulk orders for businesses, retailers, and special events. Please reach out to us directly for more details on bulk pricing, product availability, and delivery options.",
    },
    {
      id: 9,
      question: "How can I place a bulk order?",
      answer:
        "To place a bulk order, contact our customer service team with your requirements, including product type, quantity, and delivery location. We’ll provide a custom quote and arrange for timely delivery based on your needs.",
    },
    {
      id: 10,
      question: "What payment methods are available at Annapurna Farms?",
      answer:
        "We offer both online payment options and Cash on Delivery (COD) for your convenience.",
    },
    {
      id: 11,
      question: "Which online payment options do you accept?",
      answer:
        "You can pay online using credit/debit cards, net banking, UPI, and digital wallets. We use secure payment gateways to protect your information.",
    },
    {
      id: 12,
      question: "Does Annapurna Farms offer free shipping?",
      answer:
        "Yes, we provide free shipping on all orders above ₹999.",
    },
  ];
 
  return (
    <div className="faq-container">
      <h3 className="faq-heading">Any Question? We can help you</h3>
      <div className="faq-accordion">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-box">
            <div
              className={`faq-title ${open === faq.id ? "active" : ""}`}
              onClick={() => toggleFAQ(faq.id)}
            >
              <span className="faq-symbol">{open === faq.id ? "-" : "+"}</span>
              {faq.question}
            </div>
            {open === faq.id && (
              <div className="faq-content">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default FAQ;
 
 
