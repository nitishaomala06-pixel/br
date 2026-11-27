import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { CornerFiligree, LotusMandalaDivider } from './RoyalMotifs';

interface GoodToKnowAndNoteSectionProps {
  config: WeddingConfig;
}

export const GoodToKnowAndNoteSection: React.FC<GoodToKnowAndNoteSectionProps> = ({
  config,
}) => {
  return (
    <section
      id="good-to-know"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F3ECE0] border-t border-[#C69B45]/25"
      aria-labelledby="good-to-know-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* A FEW THINGS TO KEEP IN MIND */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.26em] uppercase text-[#A97E2A] font-semibold mb-3">
            Guest Guide
          </p>
          <h2
            id="good-to-know-heading"
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A0E1C]"
          >
            {config.goodToKnowHeading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {config.goodToKnowCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-[#C69B45]/45 bg-[#FDFBF7] p-7 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#C69B45]"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#A97E2A] mb-3">
                  0{index + 1}.
                </p>
                <h3 className="font-serif text-2xl font-semibold tracking-wide text-[#4A0E1C] mb-4">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-[#3A2A2D] leading-relaxed">
                  {card.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <LotusMandalaDivider className="my-12 max-w-sm mx-auto" />

        {/* A LITTLE NOTE FROM VIDHI */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl border border-[#C69B45]/55 bg-[#FFFDF8] px-7 py-10 sm:px-14 sm:py-14 text-center shadow-sm"
        >
          <div className="pointer-events-none absolute inset-2.5 border border-[#C69B45]/25" />
          <CornerFiligree className="pointer-events-none absolute top-3 left-3 w-9 h-9 sm:w-12 sm:h-12 opacity-75" />
          <CornerFiligree className="pointer-events-none absolute top-3 right-3 w-9 h-9 sm:w-12 sm:h-12 rotate-90 opacity-75" />
          <CornerFiligree className="pointer-events-none absolute bottom-3 right-3 w-9 h-9 sm:w-12 sm:h-12 rotate-180 opacity-75" />
          <CornerFiligree className="pointer-events-none absolute bottom-3 left-3 w-9 h-9 sm:w-12 sm:h-12 -rotate-90 opacity-75" />

          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FDF2F4] border border-[#9F1239]/25 mb-4"
              aria-hidden="true"
            >
              <Heart className="w-4 h-4 text-[#9F1239] fill-[#9F1239]" />
            </motion.div>

            <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-semibold mb-5">
              {config.vidhiNoteHeading}
            </p>
            <blockquote className="font-handwritten text-2xl sm:text-3xl leading-relaxed text-[#4A0E1C] max-w-2xl mx-auto">
              {config.vidhiPersonalNote}
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
