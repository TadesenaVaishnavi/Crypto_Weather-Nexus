"use client"; // Ensure this is marked as a client component

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Set dark mode to the body or html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-white">
          CryptoWeather Nexus
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/weather">Weather</NavLink>
          <NavLink href="/crypto">Crypto</NavLink>
          {/* <NavLink href="/favorites">Favorites</NavLink> */}
          <NavLink href="/news">News</NavLink>
        </div>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded-full">
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-500" />}
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Toggles visibility with `menuOpen` */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} bg-white dark:bg-gray-800 py-4`}>
        <NavLink href="/">Dashboard</NavLink>
        <NavLink href="/weather">Weather</NavLink>
        <NavLink href="/crypto">Crypto</NavLink>
        {/* <NavLink href="/favorites">Favorites</NavLink> */}
        <NavLink href="/news">News</NavLink>
      </div>
    </nav>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-500">
    {children}
  </Link>
);
