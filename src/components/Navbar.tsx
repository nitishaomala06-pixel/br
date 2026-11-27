import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface NavbarProps {
  config: WeddingConfig;
}

const NAV_ITEMS = [
  { label: 'Invitation', href: '#invitation' },
  { label: 'Celebrations', href: '#celebrations' },
  { label: 'Good to Know', href: '#good-to-know' },
  { label: 'Our Story', href: '#our-story' },
];

export const Navbar: React.FC<NavbarProps> = ({ config }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#C69B45]/25 bg-[#FAF6EF]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 xl:gap-8 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-serif italic text-base sm:text-xl xl:text-2xl font-semibold tracking-tight text-[#4A0E1C] whitespace-nowrap shrink-0 truncate max-w-[64vw] sm:max-w-none focus-visible:outline-2 focus-visible:outline-[#C69B45]"
        >
          {config.brideName} &amp; {config.groomName}
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-[#5A4246]">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 hover:text-[#4A0E1C] transition-colors whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C69B45] after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rsvp"
            className="inline-flex items-center justify-center px-5 py-2 min-h-[40px] bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-xs sm:text-sm font-medium tracking-wide transition-colors whitespace-nowrap shrink-0"
          >
            RSVP
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#4A0E1C] hover:bg-[#F3ECE0] transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#C69B45]/20 bg-[#FAF6EF] px-4 py-4 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 text-sm font-medium text-[#231416] hover:bg-[#F3ECE0] hover:text-[#4A0E1C] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#location"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 px-3 text-sm font-medium text-[#231416] hover:bg-[#F3ECE0] hover:text-[#4A0E1C] transition-colors"
          >
            Location &amp; Directions
          </a>
        </nav>
      )}
    </header>
  );
};
