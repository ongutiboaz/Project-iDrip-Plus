import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Home from "./pages/home/Home";
import Services from "./pages/services/Services";
import ServiceDetails from "./pages/services/ServiceDetails";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Booking from "./pages/booking/Booking";
// import Payment from "./pages/payment/payment";
import Drips from "./pages/drips/Drips";
import Shots from "./pages/shots/Shots";
import ShotDetails from "./components/servicesComponent/details/ShotDetails";
import DripDetails from "./components/servicesComponent/details/DripDetails";
import PaymentPage from "./pages/payment/PaymentPage";
import BookingSummary from "./components/bookingsComponent/BookingSummary";

// Pages
// impo
// import Home from './pages/home';
// import About from './pages/About';
// import Services from './pages/Services';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/drips" element={<Drips />} />
        <Route path="/shots" element={<Shots />} />

        <Route path="/drips/:id" element={<DripDetails />} />
        <Route path="/shots/:id" element={<ShotDetails />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-summary" element={<BookingSummary />} />

        <Route path="/payment" element={<PaymentPage />} />
        {/* <Route path="/confirmation" element={<ConfirmationPage />} /> */}
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
