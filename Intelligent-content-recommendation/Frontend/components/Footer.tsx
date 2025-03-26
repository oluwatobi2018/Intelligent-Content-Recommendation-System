import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-8">
      <p>© {new Date().getFullYear()} ContentRec. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
