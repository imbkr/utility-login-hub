
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-8 mt-auto border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">About Us</h3>
            <p className="text-gray-600 text-sm">
              Leading provider of utility sub-metering solutions, helping communities manage resources efficiently.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-gray-800 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>support@utilityhub.com</li>
              <li>1-800-UTILITY</li>
              <li>123 Energy Street, Power City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} UtilityHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
