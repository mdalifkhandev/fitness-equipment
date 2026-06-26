import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col text-left">
            <h2 className="text-2xl font-black text-white tracking-wider mb-5">
              FIT<span className="text-brand-primary">.</span>EQ
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              FIT-EQ provides commercial-grade training and gym gear designed for high-performance home workouts. Empower your fitness journey with our durable, premium equipment.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/mdalifkhan123/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/MDAlifK26277528" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary/80 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-red-500 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="text-sm hover:text-brand-primary transition-colors duration-200">
                  Shop All Gear
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm hover:text-brand-primary transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:text-brand-primary transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-brand-primary transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-brand-primary transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support / Coordinates */}
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Contact & Support
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Mohakhali, Gulshan,<br />
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm text-gray-400">
                  01704347965
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-sm text-gray-400">
                  mdalifkhandev@gmail.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Subscription */}
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-primary transition-all"
              />
              <button className="bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2.5 px-4 rounded-xl text-sm transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Copyright Row */}
        <div className="border-t border-gray-900 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 text-center md:text-left">
            &copy; 2026 FIT-EQ. All rights reserved. Designed for elite training.
          </p>
          
          {/* Payment Trust Icons */}
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-600">
            <span>SECURE PAYMENT:</span>
            <div className="flex items-center gap-2">
              {/* Visa */}
              <span className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-[10px] text-gray-400 tracking-wider">VISA</span>
              {/* Mastercard */}
              <span className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-[10px] text-gray-400 tracking-wider">MASTERCARD</span>
              {/* Stripe */}
              <span className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-[10px] text-gray-400 tracking-wider">STRIPE</span>
              {/* Apple Pay */}
              <span className="bg-gray-900 border border-gray-800 rounded px-2 py-1 text-[10px] text-gray-400 tracking-wider">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
