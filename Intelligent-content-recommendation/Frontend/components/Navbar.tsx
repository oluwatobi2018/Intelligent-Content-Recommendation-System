"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          ContentRec
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {["Dashboard", "Profile"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`hover:underline ${
                pathname === `/${item.toLowerCase()}` ? "font-semibold underline" : ""
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-blue-700 p-4 rounded-lg">
          {["Dashboard", "Profile"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`block py-2 hover:underline ${
                pathname === `/${item.toLowerCase()}` ? "font-semibold underline" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

