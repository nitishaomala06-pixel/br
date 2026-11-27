import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import {
  CornerFiligree,
  GaneshEmblem,
  JharokhaArchTop,
  LotusMandalaDivider,
} from './RoyalMotifs';

interface InvitationCardSectionProps {
  config: WeddingConfig;
  onOpenCustomize: () => void;
}

export const InvitationCardSection: React.FC<InvitationCardSectionProps> = ({
  config,
  onOpenCustomize,
}) => {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <>
      {/* Editorial Hero Banner */}
      <section
        id="top"
        className="relative overflow-hidden bg-[#320812] text-[#FAF6EF]"
        aria-label="Wedding Header"
      >
        {!heroImgError && config.heroMandapImage && (
          <img
            src={config.heroMandapImage}
            alt={`${config.venueName} Royal Mandap`}
            referrerPolicy="no-referrer"
            onError={() => setHeroImgError(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(42,6,14,0.74) 0%, rgba(74,14,28,0.68) 55%, rgba(42,6,14,0.92) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm sm:text-base text-[#E6CE97] font-medium mb-1">
              {config.ganeshDevanagariLine}
            </p>
            <p className="text-xs tracking-[0.26em] uppercase text-[#E6CE97]/85 mb-5">
              {config.ganeshTitle}
            </p>

            <p className="font-serif italic text-2xl sm:text-3xl text-[#FAF6EF]/95 mb-2">
              {config.welcomeLeadIn}
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[0.06em] uppercase leading-[1.1] text-[#FAF6EF] mb-5">
              {config.brideName} <span className="text-[#E6CE97]">&amp;</span> {config.groomName}
            </h1>

            <p className="text-base sm:text-xl text-[#FAF6EF]/90 max-w-2xl mx-auto leading-relaxed mb-6">
              {config.guideSubtitle}
            </p>

            <div className="text-sm sm:text-base text-[#E6CE97] tracking-wide mb-9 space-y-1">
              <p className="font-semibold">{config.weddingDatesDisplay}</p>
              <p className="text-[#FAF6EF]/85">{config.venueAddress}</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#celebrations"
                className="inline-flex items-center justify-center px-7 py-3 min-h-[44px] bg-[#C69B45] hover:bg-[#D6AC54] text-[#231416] text-sm font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0"
              >
                Explore Celebrations
              </a>
              <button
                type="button"
                onClick={onOpenCustomize}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] border border-[#E6CE97]/50 hover:border-[#E6CE97] bg-[#320812]/50 text-[#FAF6EF] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#E6CE97]" />
                <span>Customize Invitation</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Traditional Ganesh Vandana, Colour Story Introduction & Families */}
      <section
        id="invitation"
        className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6EF]"
        aria-labelledby="invitation-heading"
      >
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative border border-[#C69B45]/45 bg-[#FDFBF7] px-6 py-12 sm:px-14 sm:py-16 shadow-sm text-center"
          >
            {/* Inner Gold Hairline Frame */}
            <div className="pointer-events-none absolute inset-3 border border-[#C69B45]/25" />

            <CornerFiligree className="pointer-events-none absolute top-4 left-4 w-10 h-10 sm:w-14 sm:h-14" />
            <CornerFiligree className="pointer-events-none absolute top-4 right-4 w-10 h-10 sm:w-14 sm:h-14 rotate-90" />
            <CornerFiligree className="pointer-events-none absolute bottom-4 right-4 w-10 h-10 sm:w-14 sm:h-14 rotate-180" />
            <CornerFiligree className="pointer-events-none absolute bottom-4 left-4 w-10 h-10 sm:w-14 sm:h-14 -rotate-90" />

            <div className="relative z-10">
              <JharokhaArchTop className="mx-auto w-56 sm:w-64 mb-4" />

              <GaneshEmblem className="mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4" />

              <p className="font-serif text-lg sm:text-xl font-semibold text-[#4A0E1C] mb-1">
                {config.ganeshDevanagariLine}
              </p>
              <p className="text-xs tracking-[0.22em] uppercase text-[#A97E2A] font-semibold mb-6">
                {config.ganeshTitle}
              </p>

              <p className="font-serif italic text-2xl sm:text-3xl text-[#4A0E1C] mb-2">
                {config.welcomeLeadIn}
              </p>

              <h2
                id="invitation-heading"
                className="font-serif text-3xl sm:text-5xl font-semibold tracking-[0.06em] uppercase leading-[1.14] text-[#4A0E1C] mb-3"
              >
                {config.brideName} &amp; {config.groomName}
              </h2>

              <p className="text-sm sm:text-base font-medium text-[#685457] mb-8">
                {config.guideSubtitle}
              </p>

              <LotusMandalaDivider className="my-7 max-w-sm mx-auto" />

              {/* Exact Colour Story Introduction */}
              <div className="max-w-2xl mx-auto mb-10 border-y border-[#C69B45]/25 py-6 px-2">
                <p className="text-xs tracking-[0.22em] uppercase text-[#A97E2A] font-medium mb-3">
                  A Note on the Celebrations &amp; Dress Code
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-[#2E1E20] font-serif">
                  {config.introColourStory}
                </p>
              </div>

              {/* Date & Venue Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-center">
                <div className="border border-[#C69B45]/30 bg-[#FAF6EF] px-5 py-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A97E2A] font-medium mb-1">
                    Date
                  </p>
                  <p className="font-serif text-xl sm:text-2xl font-semibold text-[#4A0E1C]">
                    {config.weddingDatesDisplay}
                  </p>
                </div>
                <div className="border border-[#C69B45]/30 bg-[#FAF6EF] px-5 py-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A97E2A] font-medium mb-1">
                    Venue
                  </p>
                  <p className="font-serif text-xl sm:text-2xl font-semibold text-[#4A0E1C]">
                    {config.venueAddress}
                  </p>
                </div>
              </div>

              {/* Family Introductions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#C69B45]/25 text-center">
                <div className="px-4 py-2">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A97E2A] font-medium mb-2">
                    {config.brideFamilyTitle}
                  </p>
                  <p className="font-serif text-xl sm:text-2xl font-semibold text-[#231416] mb-1.5">
                    {config.brideParents}
                  </p>
                  <p className="text-xs sm:text-sm text-[#685457] leading-relaxed">
                    {config.brideFamilyNote}
                  </p>
                </div>

                <div className="px-4 py-2 md:border-l md:border-[#C69B45]/25">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#A97E2A] font-medium mb-2">
                    {config.groomFamilyTitle}
                  </p>
                  <p className="font-serif text-xl sm:text-2xl font-semibold text-[#231416] mb-1.5">
                    {config.groomParents}
                  </p>
                  <p className="text-xs sm:text-sm text-[#685457] leading-relaxed">
                    {config.groomFamilyNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
