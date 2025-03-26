import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          ContentRec
        </Link>
        <div>
          <Link href="/dashboard" className="mr-4 hover:underline">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
