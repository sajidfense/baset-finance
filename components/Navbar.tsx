"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Home Loans", href: "/services" },
      { label: "First Home Buyers", href: "/first-home-buyers" },
      { label: "Refinancing", href: "/refinancing" },
      { label: "Investment Loans", href: "/investment-loans" },
    ],
  },
  {
    label: "Calculators",
    href: "/calculators/borrowing-capacity",
    children: [
      { label: "Borrowing Capacity", href: "/calculators/borrowing-capacity" },
      { label: "Loan Repayment", href: "/calculators/loan-repayment" },
    ],
  },
  { label: "Referrer Program", href: "/referrer-program" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-luxury border-b border-marble-300"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.PNG"
                alt="Baset Finance"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="font-playfair font-bold text-charcoal text-lg leading-tight tracking-wide">
                BASET FINANCE
              </div>
              <div className="font-playfair italic text-gold text-xs tracking-wider">
                For The People
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-inter text-charcoal/80 hover:text-gold tracking-wide transition-colors duration-200">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                      <div className="bg-white border border-marble-300 shadow-luxury-lg py-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm font-inter text-charcoal/80 hover:text-gold hover:bg-gold-50 transition-colors duration-150 border-l-2 border-transparent hover:border-gold"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-inter text-charcoal/80 hover:text-gold tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/calculators/borrowing-capacity"
              className="btn-gold text-xs"
            >
              Check Borrowing Power
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-charcoal hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-marble-300 shadow-luxury-lg">
          <div className="px-6 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block py-3 text-sm font-inter text-charcoal border-b border-marble-200 hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-xs font-inter text-charcoal/60 hover:text-gold transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        — {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/calculators/borrowing-capacity"
                className="btn-gold w-full justify-center text-xs"
                onClick={() => setMobileOpen(false)}
              >
                Check Borrowing Power
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
