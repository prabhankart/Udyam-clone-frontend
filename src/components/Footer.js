import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1a202c] text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">UDYAM REGISTRATION</h3>
            <p className="mb-2">Ministry of MSME</p>
            <p className="mb-2">Udyog Bhawan - New Delhi</p>
            <p className="mb-4">
              <strong>Email:</strong> champions@gov.in
            </p>
            <h4 className="font-semibold text-white">Contact Us</h4>
            <p>For Grievances / Problems</p>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">&gt; CHAMPIONS</a></li>
              <li><a href="#" className="hover:text-white">&gt; MSME Samadhaan</a></li>
              <li><a href="#" className="hover:text-white">&gt; MSME Sambandh</a></li>
              <li><a href="#" className="hover:text-white">&gt; MSME Dashboard</a></li>
              <li><a href="#" className="hover:text-white">&gt; Entrepreneurship Skill Development Programme (ESDP)</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© Copyright Udyam Registration. All Rights Reserved. Website Content Managed by Ministry of Micro Small and Medium Enterprises, GoI.</p>
          <p>Website hosted & managed by National Informatics Centre, Ministry of Communications and IT, Government of India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;