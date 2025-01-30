import { motion } from "motion/react";

export default function Navbar() {
    return (
        <>
        {/* <motion.div
            // animate={{
            //     y: 15
            // }}
            className="top-0 absolute w-screen h-14 border-b-4 border-zinc-800 bg-black/60"
        >

        </motion.div> */}
        </>
    )
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyLogo</Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-cyan-400">Home</Link>
          <Link to="/about" className="text-white hover:text-cyan-400">About</Link>
          <Link to="/services" className="text-white hover:text-cyan-400">Services</Link>
          <Link to="/contact" className="text-white hover:text-cyan-400">Contact</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="text-white focus:outline-none">
            <span className="text-2xl">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-700 text-white p-4`}>
        <Link to="/" className="block py-2">Home</Link>
        <Link to="/about" className="block py-2">About</Link>
        <Link to="/services" className="block py-2">Services</Link>
        <Link to="/contact" className="block py-2">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;