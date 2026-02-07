import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";

// Pages
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Services from "./pages/services/Services";
import ServiceDetails from "./pages/services/ServiceDetails";
import Drips from "./pages/drips/Drips";
import Shots from "./pages/shots/Shots";
import DripDetails from "./components/servicesComponent/details/DripDetails";
import ShotDetails from "./components/servicesComponent/details/ShotDetails";
import Booking from "./pages/booking/Booking";
import BookingSummary from "./components/bookingsComponent/BookingSummary";
import PaymentPage from "./pages/payment/PaymentPage";
import MpesaTest from "./pages/mpesatest/mpesatest";

// Optional: You can add a confirmation page later
// import ConfirmationPage from "./pages/confirmation/ConfirmationPage";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Home & Info */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/drips" element={<Drips />} />
        <Route path="/drips/:id" element={<DripDetails />} />
        <Route path="/shots" element={<Shots />} />
        <Route path="/shots/:id" element={<ShotDetails />} />

        {/* Booking */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-summary" element={<BookingSummary />} />

        {/* Payment */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/mpesa" element={<MpesaTest />} />

        {/* Optional: Confirmation */}
        {/* <Route path="/confirmation" element={<ConfirmationPage />} /> */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
