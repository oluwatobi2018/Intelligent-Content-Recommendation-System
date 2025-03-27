import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} ContentRec. All rights reserved.
        </p>
        
        {/* Optional Social Links */}
        <div className="flex justify-center mt-3 space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
