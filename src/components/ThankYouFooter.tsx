import React from 'react';
import { ArrowUp } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { CornerFiligree, LotusMandalaDivider } from './RoyalMotifs';

interface ThankYouFooterProps {
  config: WeddingConfig;
}

export const ThankYouFooter: React.FC<ThankYouFooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative overflow-hidden bg-[#320812] text-[#FAF6EF] pt-20 pb-24 px-4 sm:px-8 text-center border-t border-[#C69B45]/40"
      aria-label="Closing Blessing and Footer"
    >
      <CornerFiligree className="pointer-events-none absolute top-5 left-5 w-12 h-12 sm:w-16 sm:h-16 opacity-60" />
      <CornerFiligree className="pointer-events-none absolute top-5 right-5 w-12 h-12 sm:w-16 sm:h-16 rotate-90 opacity-60" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="animate-gentle-float mb-6">
          <LotusMandalaDivider light className="max-w-xs mx-auto" />
        </div>

        <p className="font-serif italic text-2xl sm:text-4xl text-[#FAF6EF] leading-relaxed mb-6">
          {config.thankYouMessage}
        </p>

        <p className="font-handwritten text-2xl sm:text-3xl text-[#E6CE97] mb-1">
          {config.thankYouSignoff}
        </p>

        <h2 className="font-serif italic text-4xl sm:text-6xl font-semibold gold-shimmer-text mb-6">
          {config.brideName} &amp; {config.groomName}
        </h2>

        <p className="text-xs sm:text-sm tracking-wide text-[#E6CE97]/85 mb-10">
          {config.thankYouSubtext}
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] border border-[#E6CE97]/50 hover:border-[#E6CE97] hover:bg-[#4A0E1C] text-[#FAF6EF] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ArrowUp className="w-4 h-4 text-[#E6CE97]" />
          <span>Back to Top</span>
        </button>

        <div className="mt-12 pt-6 border-t border-[#C69B45]/20 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E6CE97]/70">
          <a href="#invitation" className="hover:text-[#E6CE97] transition-colors">
            Invitation
          </a>
          <a href="#save-the-date" className="hover:text-[#E6CE97] transition-colors">
            Save the Date
          </a>
          <a href="#celebrations" className="hover:text-[#E6CE97] transition-colors">
            Celebrations
          </a>
          <a href="#good-to-know" className="hover:text-[#E6CE97] transition-colors">
            Good to Know
          </a>
          <a href="#our-story" className="hover:text-[#E6CE97] transition-colors">
            Our Story
          </a>
          <a href="#location" className="hover:text-[#E6CE97] transition-colors">
            Location
          </a>
          <a href="#rsvp" className="hover:text-[#E6CE97] transition-colors">
            RSVP
          </a>
        </div>
      </div>
    </footer>
  );
};
