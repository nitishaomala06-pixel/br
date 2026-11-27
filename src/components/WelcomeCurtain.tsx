import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { CornerFiligree, JharokhaArchTop, LotusMandalaDivider } from './RoyalMotifs';

interface WelcomeCurtainProps {
  config: WeddingConfig;
  isOpen: boolean;
  onEnter: (withMusic: boolean) => void;
}

export const WelcomeCurtain: React.FC<WelcomeCurtainProps> = ({
  config,
  isOpen,
  onEnter,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          key="welcome-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -28, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#320812] text-[#FAF6EF] p-4 sm:p-8"
          aria-label="Royal Wedding Welcome Screen"
        >
          {/* Ambient Mandap Backdrop with Scrim */}
          {!imgError && config.heroMandapImage && (
            <img
              src={config.heroMandapImage}
              alt="Royal Wedding Mandap Backdrop"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="absolute inset-0 h-full w-full object-cover opacity-30 scale-105"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(74,14,28,0.68) 0%, rgba(42,6,14,0.94) 72%, rgba(28,4,9,0.98) 100%)',
            }}
          />

          {/* Framed Royal Invitation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-2xl border border-[#C69B45]/45 bg-[#3B0B17]/82 backdrop-blur-md px-6 py-10 sm:px-14 sm:py-12 text-center shadow-2xl"
          >
            {/* Corner Floral Ornaments */}
            <CornerFiligree className="pointer-events-none absolute top-3 left-3 w-12 h-12 sm:w-16 sm:h-16 opacity-80" />
            <CornerFiligree className="pointer-events-none absolute top-3 right-3 w-12 h-12 sm:w-16 sm:h-16 rotate-90 opacity-80" />
            <CornerFiligree className="pointer-events-none absolute bottom-3 right-3 w-12 h-12 sm:w-16 sm:h-16 rotate-180 opacity-80" />
            <CornerFiligree className="pointer-events-none absolute bottom-3 left-3 w-12 h-12 sm:w-16 sm:h-16 -rotate-90 opacity-80" />

            <JharokhaArchTop className="mx-auto w-52 sm:w-64 mb-4 opacity-90" />

            <p className="text-sm sm:text-base text-[#E6CE97] font-medium mb-0.5">
              {config.ganeshDevanagariLine}
            </p>
            <p className="text-xs tracking-[0.22em] uppercase text-[#E6CE97]/80 mb-5">
              {config.ganeshTitle}
            </p>

            <p className="font-serif italic text-xl sm:text-2xl text-[#FAF6EF]/90 mb-2">
              {config.welcomeLeadIn}
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[0.06em] uppercase leading-[1.12] gold-shimmer-text mb-4">
              {config.brideName} <span className="text-[#E6CE97]">&amp;</span> {config.groomName}
            </h1>

            <p className="text-sm sm:text-base text-[#FAF6EF]/85 max-w-md mx-auto leading-relaxed mb-5">
              {config.guideSubtitle}
            </p>

            <LotusMandalaDivider light className="my-5 max-w-xs mx-auto" />

            <div className="space-y-1 text-sm sm:text-base text-[#FAF6EF]/90 mb-8">
              <p className="font-medium tracking-wide text-[#E6CE97]">
                {config.weddingDatesDisplay}
              </p>
              <p className="text-[#FAF6EF]/85">
                {config.venueAddress}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => onEnter(true)}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 min-h-[46px] bg-[#C69B45] hover:bg-[#D6AC54] text-[#231416] font-semibold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6CE97] cursor-pointer whitespace-nowrap shrink-0"
              >
                <Volume2 className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                <span>Open Invitation</span>
              </button>

              <button
                type="button"
                onClick={() => onEnter(false)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#E6CE97]/75 hover:text-[#E6CE97] py-1.5 px-3 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Enter without music</span>
              </button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
