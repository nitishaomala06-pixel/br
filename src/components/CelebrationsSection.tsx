import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Check, MapPin, Pencil, X } from 'lucide-react';
import { WeddingConfig, WeddingEvent } from '../types/wedding';
import { CornerFiligree, EventIllustration, LotusMandalaDivider } from './RoyalMotifs';

interface CelebrationsSectionProps {
  config: WeddingConfig;
  onUpdateEvent: (updated: WeddingEvent) => void;
}

export const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({
  config,
  onUpdateEvent,
}) => {
  const [dayFilter, setDayFilter] = useState<'all' | 'day1' | 'day2'>('all');
  const [editingEvent, setEditingEvent] = useState<WeddingEvent | null>(null);

  const dayOneEvents = config.events.filter((ev) => ev.dayGroup === 'day1');
  const dayTwoEvents = config.events.filter((ev) => ev.dayGroup === 'day2');

  const buildMapsUrl = (query: string) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    onUpdateEvent(editingEvent);
    setEditingEvent(null);
  };

  const renderEventCard = (event: WeddingEvent, index: number) => {
    const isSangeet = event.themeVariant === 'sangeet';
    const isHaldi = event.themeVariant === 'haldi';
    const isVarmala = event.themeVariant === 'varmala';
    const isPheras = event.themeVariant === 'pheras';

    const cardSurfaceClass = isSangeet
      ? 'bg-[#221410] text-[#FAF6EF] border-[#C69B45]/60 shadow-lg'
      : isHaldi
      ? 'bg-[#FFFDF2] text-[#231416] border-[#EAB308]/55'
      : isVarmala
      ? 'bg-[#FFF9F8] text-[#231416] border-[#9F1239]/35'
      : isPheras
      ? 'bg-[#FBF9F2] text-[#231416] border-[#5F6F3A]/40'
      : 'bg-[#FDFBF7] text-[#231416] border-[#C69B45]/45';

    const subtitleColor = isSangeet
      ? 'text-[#E6CE97]'
      : isVarmala
      ? 'text-[#9F1239]'
      : isPheras
      ? 'text-[#5F6F3A]'
      : isHaldi
      ? 'text-[#B45309]'
      : 'text-[#685457]';

    const mainParagraphs = event.description.split(/\n\s*\n/).filter(Boolean);

    return (
      <motion.article
        key={event.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className={`relative overflow-hidden border p-6 sm:p-8 flex flex-col h-full transition-all duration-300 ${cardSurfaceClass}`}
      >
        {/* Haldi Bright Yellow Sunshine Glow */}
        {isHaldi && (
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(250, 204, 21, 0.16) 0%, rgba(251, 146, 60, 0.06) 50%, transparent 72%)',
            }}
            aria-hidden="true"
          />
        )}

        {/* Sangeet Coffee & Candles Glow + Glitter */}
        {isSangeet && (
          <>
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full animate-candle-glow"
              style={{
                background:
                  'radial-gradient(circle, rgba(245, 196, 81, 0.24) 0%, rgba(217, 119, 6, 0.09) 45%, transparent 72%)',
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full animate-candle-glow"
              style={{
                background:
                  'radial-gradient(circle, rgba(209, 213, 219, 0.14) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-8 right-16 w-1.5 h-1.5 rounded-full bg-[#F3E0B0] animate-glitter-twinkle"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute top-14 right-28 w-1 h-1 rounded-full bg-[#E5E7EB] animate-glitter-twinkle"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute bottom-12 right-12 w-1.5 h-1.5 rounded-full bg-[#E6CE97] animate-glitter-twinkle"
              aria-hidden="true"
            />
          </>
        )}

        {(isVarmala || isPheras) && (
          <CornerFiligree
            color={isVarmala ? '#9F1239' : '#5F6F3A'}
            className="pointer-events-none absolute top-2.5 right-2.5 w-9 h-9 rotate-90 opacity-45"
          />
        )}

        <div className="relative z-10 flex-1 flex flex-col justify-between gap-6">
          {/* Top & Main Content */}
          <div className="space-y-5">
            {/* Top Bar: Date & Time + Edit Button */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className={`inline-flex items-center gap-2 text-xs tracking-[0.14em] uppercase font-semibold ${subtitleColor}`}>
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{event.dateTimeDisplay}</span>
              </div>

              <button
                type="button"
                onClick={() => setEditingEvent({ ...event })}
                className={`inline-flex items-center gap-1 text-xs py-1 px-2.5 border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSangeet
                    ? 'border-[#C69B45]/40 text-[#E6CE97]/85 hover:text-[#FAF6EF] hover:border-[#E6CE97]'
                    : 'border-[#C69B45]/35 text-[#685457] hover:text-[#4A0E1C] hover:border-[#4A0E1C]/50'
                }`}
                aria-label={`Edit ${event.name}`}
              >
                <Pencil className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            {/* Event Illustration + Heading + Subtitle */}
            <div className="flex items-start sm:items-center gap-4">
              <div
                className={`w-16 h-16 shrink-0 flex items-center justify-center border ${
                  isSangeet
                    ? 'bg-[#2E1B16] border-[#C69B45]/50'
                    : isVarmala
                    ? 'bg-[#FDF2F4] border-[#9F1239]/25'
                    : isPheras
                    ? 'bg-[#F4F6EE] border-[#5F6F3A]/30'
                    : isHaldi
                    ? 'bg-[#FEF9C3] border-[#EAB308]/45'
                    : 'bg-[#F3ECE0] border-[#C69B45]/35'
                }`}
              >
                <EventIllustration
                  type={event.illustration}
                  lightMode={isSangeet}
                  className="w-12 h-12"
                />
              </div>

              <div>
                <h4
                  className={`font-serif text-3xl sm:text-4xl font-semibold tracking-wide ${
                    isSangeet ? 'text-[#E6CE97]' : 'text-[#4A0E1C]'
                  }`}
                >
                  {event.name}
                </h4>
                <p
                  className={`font-serif italic text-base sm:text-lg font-medium mt-0.5 ${
                    isSangeet ? 'text-[#FAF6EF]/90' : 'text-[#5A4246]'
                  }`}
                >
                  {event.subtitle}
                </p>
              </div>
            </div>

            {/* Lead Summary Description */}
            {event.introDescription && (
              <p
                className={`text-sm sm:text-base font-medium leading-relaxed ${
                  isSangeet ? 'text-[#F3E0B0]' : 'text-[#4A0E1C]'
                }`}
              >
                {event.introDescription}
              </p>
            )}

            {/* Full Multi-Paragraph Main Description */}
            <div
              className={`space-y-3 text-sm sm:text-[15px] leading-relaxed ${
                isSangeet ? 'text-[#FAF6EF]/90' : 'text-[#3A2A2D]'
              }`}
            >
              {mainParagraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Bottom Section: Dress Code + Closing Note + Venue Footer */}
          <div className="space-y-5">
            {/* Single Unified Dress Code Section */}
            <div
              className={`border p-4 sm:p-5 space-y-3 ${
                isSangeet
                  ? 'border-[#C69B45]/35 bg-[#2A1914]'
                  : isHaldi
                  ? 'border-[#EAB308]/40 bg-[#FEFBE8]'
                  : isVarmala
                  ? 'border-[#9F1239]/20 bg-[#FDF3F5]'
                  : isPheras
                  ? 'border-[#5F6F3A]/25 bg-[#F4F6EE]'
                  : 'border-[#C69B45]/30 bg-[#FAF6EF]'
              }`}
            >
              <p
                className={`text-xs tracking-[0.2em] uppercase font-semibold ${
                  isSangeet ? 'text-[#E6CE97]' : 'text-[#A97E2A]'
                }`}
              >
                {event.dressCodeTitle || 'DRESS CODE'}
              </p>

              {(event.dressCodeIntro ||
                (event.dressCodeLines && event.dressCodeLines.length > 0)) && (
                <div
                  className={`space-y-1.5 text-sm sm:text-base leading-relaxed ${
                    isSangeet ? 'text-[#FAF6EF]/92' : 'text-[#231416]'
                  }`}
                >
                  {event.dressCodeIntro && <p>{event.dressCodeIntro}</p>}
                  {event.dressCodeLines?.map((line, lIdx) => (
                    <p key={lIdx}>{line}</p>
                  ))}
                </div>
              )}

              {event.swatches && event.swatches.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-1">
                  {event.swatches.map((swatch) => (
                    <div
                      key={swatch.label}
                      className="inline-flex items-center gap-2.5"
                    >
                      <span
                        className={`w-7 h-7 rounded-full shrink-0 border shadow-xs ${
                          isSangeet
                            ? 'border-[#FAF6EF]/45'
                            : 'border-[#231416]/20'
                        }`}
                        style={{
                          background: swatch.color,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          isSangeet ? 'text-[#FAF6EF]/95' : 'text-[#231416]'
                        }`}
                      >
                        {swatch.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Event Closing Hospitality Note (if provided) */}
            {event.dressCodeClosingLines && event.dressCodeClosingLines.length > 0 && (
              <div
                className={`space-y-2 text-sm sm:text-[15px] leading-relaxed ${
                  isSangeet ? 'text-[#FAF6EF]/90' : 'text-[#3A2A2D]'
                }`}
              >
                {event.dressCodeClosingLines.map((line, cIdx) => (
                  <p key={cIdx}>{line}</p>
                ))}
              </div>
            )}

            {/* Card Footer: Venue & Google Maps Action */}
            <div
              className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 ${
                isSangeet ? 'border-[#C69B45]/30' : 'border-[#C69B45]/25'
              }`}
            >
              <div className="space-y-0.5 text-xs sm:text-sm min-w-0">
                <p
                  className={`uppercase tracking-[0.16em] text-[11px] font-semibold ${
                    isSangeet ? 'text-[#E6CE97]/85' : 'text-[#A97E2A]'
                  }`}
                >
                  Venue
                </p>
                <p className={isSangeet ? 'text-[#FAF6EF] font-medium' : 'text-[#231416] font-medium'}>
                  {event.venue}
                </p>
              </div>

              <a
                href={buildMapsUrl(event.mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isSangeet
                    ? 'bg-[#C69B45] hover:bg-[#D6AC54] text-[#231416]'
                    : 'bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF]'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  return (
    <section
      id="celebrations"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6EF]"
      aria-labelledby="celebrations-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-medium mb-3">
            The Four Functions
          </p>
          <h2
            id="celebrations-heading"
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A0E1C] mb-4"
          >
            Schedule &amp; Colour Stories
          </h2>
          <p className="text-sm sm:text-base text-[#5A4246] leading-relaxed">
            {config.introColourStory}
          </p>
        </div>

        {/* Day Filter Tabs */}
        <div className="flex justify-center mb-14">
          <div
            className="inline-flex items-center gap-1 p-1 bg-[#F3ECE0] border border-[#C69B45]/35"
            role="tablist"
            aria-label="Filter wedding celebrations by day"
          >
            {[
              { id: 'all', label: 'All Celebrations' },
              { id: 'day1', label: 'Day One · 16 Jan' },
              { id: 'day2', label: 'Day Two · 17 Jan' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={dayFilter === tab.id}
                onClick={() => setDayFilter(tab.id as 'all' | 'day1' | 'day2')}
                className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  dayFilter === tab.id
                    ? 'bg-[#4A0E1C] text-[#FAF6EF]'
                    : 'text-[#5A4246] hover:text-[#4A0E1C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* DAY ONE SECTION */}
        {(dayFilter === 'all' || dayFilter === 'day1') && dayOneEvents.length > 0 && (
          <div className="mb-16 border border-[#EAB308]/35 bg-[#FDF8EC] p-5 sm:p-10">
            <div className="text-center mb-8 pb-6 border-b border-[#C69B45]/30">
              <p className="text-xs tracking-[0.28em] uppercase text-[#B45309] font-semibold mb-1.5">
                DAY ONE
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A0E1C]">
                Friday, 16 January 2027
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {dayOneEvents.map((ev, idx) => renderEventCard(ev, idx))}
            </div>
          </div>
        )}

        {/* DAY TWO SECTION */}
        {(dayFilter === 'all' || dayFilter === 'day2') && dayTwoEvents.length > 0 && (
          <div className="border border-[#9F1239]/25 bg-[#F7F1E7] p-5 sm:p-10">
            <div className="text-center mb-8 pb-6 border-b border-[#C69B45]/30">
              <p className="text-xs tracking-[0.28em] uppercase text-[#9F1239] font-semibold mb-1.5">
                DAY TWO
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A0E1C]">
                Saturday, 17 January 2027
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {dayTwoEvents.map((ev, idx) => renderEventCard(ev, idx))}
            </div>
          </div>
        )}

        <LotusMandalaDivider className="mt-16 max-w-sm mx-auto" />
      </div>

      {/* Inline Event Editor Modal */}
      {editingEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#231416]/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-event-title"
        >
          <div className="w-full max-w-lg border border-[#C69B45]/50 bg-[#FAF6EF] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#C69B45]/25">
              <h3 id="edit-event-title" className="font-serif text-2xl font-semibold text-[#4A0E1C]">
                Edit Event Details
              </h3>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="w-9 h-9 inline-flex items-center justify-center text-[#5A4246] hover:text-[#231416] cursor-pointer"
                aria-label="Close editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#231416] mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.name}
                    onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#231416] mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingEvent.subtitle}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, subtitle: e.target.value })
                    }
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Date &amp; Time
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.dateTimeDisplay}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, dateTimeDisplay: e.target.value })
                  }
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Venue
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Intro Highlight
                </label>
                <input
                  type="text"
                  value={editingEvent.introDescription ?? ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, introDescription: e.target.value })
                  }
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Main Description
                </label>
                <textarea
                  rows={5}
                  required
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Google Maps Query
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.mapQuery}
                  onChange={(e) => setEditingEvent({ ...editingEvent, mapQuery: e.target.value })}
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 text-sm font-medium text-[#5A4246] hover:text-[#231416] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-sm font-medium cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
