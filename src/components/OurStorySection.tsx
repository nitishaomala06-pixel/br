import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Expand, Heart, ImagePlus, X } from 'lucide-react';
import { GalleryPhoto, WeddingConfig } from '../types/wedding';
import { CornerFiligree, LotusMandalaDivider } from './RoyalMotifs';

interface OurStorySectionProps {
  config: WeddingConfig;
  onSetPhotoAtSlot: (slotIndex: 0 | 1, photo: GalleryPhoto) => void;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({
  config,
  onSetPhotoAtSlot,
}) => {
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const slot1InputRef = useRef<HTMLInputElement | null>(null);
  const slot2InputRef = useRef<HTMLInputElement | null>(null);

  const photo1 =
    config.photos.find((p) => p.id === 'couple-photo-1') ?? config.photos[0];
  const photo2 =
    config.photos.find((p) => p.id === 'couple-photo-2') ??
    (photo1?.id === 'couple-photo-1' ? config.photos[1] : undefined);

  const handleFileChange = (slotIndex: 0 | 1, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      const defaultCaption =
        slotIndex === 0
          ? `${config.brideName} & ${config.groomName} — Standing Together`
          : `${config.brideName} & ${config.groomName} — Romantic Moment`;
      onSetPhotoAtSlot(slotIndex, {
        id: `couple-photo-${slotIndex + 1}`,
        url: reader.result,
        caption: defaultCaption,
        category: 'Couple Portrait',
      });
    };
    reader.readAsDataURL(file);
  };

  const brideParagraphs = config.brideBio.split(/\n\s*\n/).filter(Boolean);
  const groomParagraphs = config.groomBio.split(/\n\s*\n/).filter(Boolean);

  return (
    <section
      id="our-story"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6EF] border-t border-[#C69B45]/25"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.26em] uppercase text-[#A97E2A] font-semibold mb-3">
            Two Souls · One Journey
          </p>
          <h2
            id="story-heading"
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A0E1C] mb-4"
          >
            Our Story &amp; Journey
          </h2>
          <p className="text-sm sm:text-base text-[#5A4246] leading-relaxed">
            Meet {config.brideName} and {config.groomName}, stepping into a lifetime of love, harmony, and shared dreams.
          </p>
        </div>

        {/* Hidden Inputs for Original Photo Slots */}
        <input
          ref={slot1InputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(0, e.target.files?.[0])}
        />
        <input
          ref={slot2InputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(1, e.target.files?.[0])}
        />

        {/* Editorial Row 1: The Bride — Vidhi Khinvesra + Photograph 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16"
        >
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative h-full min-h-[340px] sm:min-h-[440px] border border-[#C69B45]/50 bg-[#FDFBF7] p-3 flex items-center justify-center">
              {photo1 ? (
                <button
                  type="button"
                  onClick={() => setLightboxPhoto(photo1)}
                  className="group relative h-full w-full overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4A0E1C]"
                  aria-label={`View ${photo1.caption} full screen`}
                >
                  <img
                    src={photo1.url}
                    alt={photo1.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#231416]/75 text-[#FAF6EF] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-3.5 h-3.5" />
                    <span>View Full Screen</span>
                  </span>
                </button>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center border border-dashed border-[#C69B45]/55 bg-[#F3ECE0]/60 p-8 text-center">
                  <Heart className="w-8 h-8 text-[#9F1239] mb-3" />
                  <p className="font-serif text-2xl text-[#4A0E1C] mb-1.5">
                    Couple Photograph 1
                  </p>
                  <p className="text-xs sm:text-sm text-[#5A4246] max-w-xs mb-5">
                    Upload the original photograph of {config.brideName} &amp; {config.groomName} standing together in front of the red rose heart decoration.
                  </p>
                  <button
                    type="button"
                    onClick={() => slot1InputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    <ImagePlus className="w-4 h-4 text-[#E6CE97]" />
                    <span>Upload Photograph 1</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative border border-[#C69B45]/40 bg-[#FDFBF7] p-7 sm:p-11">
              <CornerFiligree className="pointer-events-none absolute top-3 right-3 w-9 h-9 rotate-90 opacity-60" />

              <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-semibold mb-2">
                {config.brideHeading}
              </p>
              <h3 className="font-serif italic text-4xl sm:text-5xl font-semibold text-[#4A0E1C] mb-6">
                {config.brideName}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#3A2A2D] leading-relaxed">
                {brideParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <LotusMandalaDivider className="my-12 max-w-xs mx-auto" />

        {/* Editorial Row 2: The Groom — Yash Kothari + Photograph 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-14"
        >
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <div className="relative border border-[#C69B45]/40 bg-[#FDFBF7] p-7 sm:p-11">
              <CornerFiligree className="pointer-events-none absolute top-3 left-3 w-9 h-9 opacity-60" />

              <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-semibold mb-2">
                {config.groomHeading}
              </p>
              <h3 className="font-serif italic text-4xl sm:text-5xl font-semibold text-[#4A0E1C] mb-6">
                {config.groomName}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#3A2A2D] leading-relaxed">
                {groomParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col order-1 lg:order-2">
            <div className="relative h-full min-h-[340px] sm:min-h-[440px] border border-[#C69B45]/50 bg-[#FDFBF7] p-3 flex items-center justify-center">
              {photo2 ? (
                <button
                  type="button"
                  onClick={() => setLightboxPhoto(photo2)}
                  className="group relative h-full w-full overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4A0E1C]"
                  aria-label={`View ${photo2.caption} full screen`}
                >
                  <img
                    src={photo2.url}
                    alt={photo2.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#231416]/75 text-[#FAF6EF] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-3.5 h-3.5" />
                    <span>View Full Screen</span>
                  </span>
                </button>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center border border-dashed border-[#C69B45]/55 bg-[#F3ECE0]/60 p-8 text-center">
                  <Heart className="w-8 h-8 text-[#9F1239] mb-3" />
                  <p className="font-serif text-2xl text-[#4A0E1C] mb-1.5">
                    Couple Photograph 2
                  </p>
                  <p className="text-xs sm:text-sm text-[#5A4246] max-w-xs mb-5">
                    Upload the original photograph of {config.brideName} &amp; {config.groomName} in a romantic pose in front of the red rose heart decoration.
                  </p>
                  <button
                    type="button"
                    onClick={() => slot2InputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    <ImagePlus className="w-4 h-4 text-[#E6CE97]" />
                    <span>Upload Photograph 2</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox for Story Photos */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#180509]/95 p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Couple Photograph Fullscreen View"
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 inline-flex items-center justify-center border border-[#E6CE97]/40 text-[#FAF6EF] hover:bg-[#4A0E1C] transition-colors cursor-pointer"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-5xl w-full flex flex-col items-center">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[82vh] w-auto object-contain border border-[#C69B45]/40"
              />
              <p className="mt-4 font-serif text-xl sm:text-2xl text-[#FAF6EF] text-center">
                {lightboxPhoto.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
