import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Baset Finance — Home">
              <div className="relative w-8 h-8 brightness-0 invert opacity-80">
                <Image src="/logo2.PNG" alt="Baset Finance logo" fill className="object-contain" />
              </div>
              <div>
                <div className="font-playfair font-bold text-white text-lg tracking-wide">
                  BASET FINANCE
                </div>
                <div className="font-playfair italic text-gold text-xs tracking-wider">
                  For The People
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-sm font-inter leading-relaxed mb-4">
              Trusted Brisbane mortgage broker helping Australians secure smarter home loans with transparent advice and access to 40+ lenders.
            </p>
            <p className="text-white/40 text-xs font-inter leading-relaxed mb-6">
              Serving Brisbane, Gold Coast, Sunshine Coast, Ipswich, Logan, and all of Australia.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={16} />, href: "#", label: "Baset Finance on Instagram" },
                { icon: <Facebook size={16} />, href: "#", label: "Baset Finance on Facebook" },
                { icon: <Linkedin size={16} />, href: "#", label: "Baset Finance on LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services navigation">
            <h4 className="font-playfair text-white font-semibold mb-5 text-sm tracking-widest uppercase">
              Services
            </h4>
            <div className="w-8 h-px bg-gold mb-5" />
            <ul className="space-y-3">
              {[
                { label: "Home Loans", href: "/services" },
                { label: "First Home Buyers", href: "/first-home-buyers" },
                { label: "Refinancing", href: "/refinancing" },
                { label: "Investment Loans", href: "/investment-loans" },
                { label: "Commercial Loans", href: "/services#commercial" },
                { label: "Construction Loans", href: "/services#construction" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm font-inter hover:text-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Quick links navigation">
            <h4 className="font-playfair text-white font-semibold mb-5 text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <div className="w-8 h-px bg-gold mb-5" />
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Borrowing Calculator", href: "/calculators/borrowing-capacity" },
                { label: "Repayment Calculator", href: "/calculators/loan-repayment" },
                { label: "All Calculators", href: "/calculators" },
                { label: "Refer & Earn", href: "/referrer-program" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/50 text-sm font-inter hover:text-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-white font-semibold mb-5 text-sm tracking-widest uppercase">
              Contact
            </h4>
            <div className="w-8 h-px bg-gold mb-5" />
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                  <a href="tel:+61420601553" className="text-white/50 text-sm font-inter hover:text-gold transition-colors">
                    0420 601 553
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                  <a href="mailto:baset@basetfinance.com.au" className="text-white/50 text-sm font-inter hover:text-gold transition-colors">
                    baset@basetfinance.com.au
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-white/50 text-sm font-inter">
                    Brisbane, QLD — Serving All of Australia
                  </span>
                </li>
              </ul>
            </address>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-inter text-xs text-white/30 leading-relaxed">
                Mon–Sat 8am–7pm AEST<br />
                Free consultations available by phone or video call.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs font-inter">
              © {new Date().getFullYear()} Baset Finance. All rights reserved. Australian Credit Licence 389328.
            </p>
            <div className="flex items-center gap-6">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Credit Guide", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/30 text-xs font-inter hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
