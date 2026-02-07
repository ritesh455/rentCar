import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useContext } from "react";
import { DataContext } from "./context/DataContext";

export default function AboutUs() {
  const navigate = useNavigate();

      const { isAuthenticated,role } = useContext(DataContext);
    
      const handleBookClick = () => {
        if (role === "owner") {
      navigate("/owner/vehicles");
    } else {
      navigate("/vehicles");
    }
  };
        const getButtonText = () => {
      if (role === "owner") {
        return "See Your Vehicles";
      }
      return "Reserve Your Ride";
    };
  

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-sm">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Redefining the Way You Travel
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            CarRent is a dedicated to providing 
            secure, and transparent vehicle rental experiences for everyone.
          </p>
        </div>
      </section>

      {/* Our Mission & Tech */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our goal is to eliminate the stress of traditional car rentals. We've built 
                a community-focused ecosystem where transparency and safety come first. 
                Whether you are a traveler or a car owner, we provide the tools to make 
                every journey memorable.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By leveraging modern technologies like <strong>React</strong> and 
                <strong> Node.js</strong>, we ensure a fast, high-performance experience 
                that keeps you moving.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 shadow-inner">
              <h3 className="text-xl font-bold text-blue-600 mb-4">The CarRent Edge</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Verified Fleet:</strong> Rigorous admin checks on RC and NOC documents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span><strong>Secure Tech:</strong> JWT-protected endpoints and data privacy.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Diagram Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How CarRent Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Browse", desc: "Search our verified fleet of vehicles." },
              { step: "02", title: "Book", desc: "Securely checkout with instant confirmation." },
              { step: "03", title: "Verify", desc: "Admin reviews ensure a safe ride for all." },
              { step: "04", title: "Drive", desc: "Pick up your keys and enjoy the journey." }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-black text-blue-100 absolute -top-6 left-1/2 -translate-x-1/2 z-0">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to hit the road?</h2>
          <p className="text-gray-500 mb-10">
            Join thousands of users who trust CarRent for their daily commutes and weekend adventures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleBookClick}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
               {getButtonText()}
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all"
            >
              Register as Owner
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Contact Info Placeholder */}
      <footer className="py-10 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 CarRent Inc. Built with Passion & React.</p>
      </footer>
    </div>
  );
}