import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, MessageCircle, Send, Trash2 } from 'lucide-react';
import { RsvpSubmission, WeddingConfig } from '../types/wedding';
import { LotusMandalaDivider } from './RoyalMotifs';

interface RsvpSectionProps {
  config: WeddingConfig;
  rsvps: RsvpSubmission[];
  onSubmitRsvp: (entry: RsvpSubmission) => void;
  onDeleteRsvp: (id: string) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  config,
  rsvps,
  onSubmitRsvp,
  onDeleteRsvp,
}) => {
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(() =>
    config.events.map((e) => e.name)
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedEntry, setSubmittedEntry] = useState<RsvpSubmission | null>(null);

  const toggleEvent = (eventName: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventName)
        ? prev.filter((item) => item !== eventName)
        : [...prev, eventName]
    );
  };

  const buildWhatsAppLink = (entry: RsvpSubmission) => {
    const cleanNumber = config.rsvpWhatsappNumber.replace(/[^\d]/g, '');
    const statusText =
      entry.attending === 'yes'
        ? `Joyfully Attending (${entry.guestCount} guest${entry.guestCount > 1 ? 's' : ''})`
        : 'Regretfully Unable to Attend';
    const eventsLine =
      entry.attending === 'yes' && entry.selectedEvents.length > 0
        ? `\nEvents: ${entry.selectedEvents.join(', ')}`
        : '';
    const msgLine = entry.message.trim()
      ? `\nBlessings / Message: "${entry.message.trim()}"`
      : '';

    const fullText = `Namaste! Wedding RSVP for ${config.brideName} & ${config.groomName} (${config.weddingDatesDisplay})\n\nGuest Name: ${entry.guestName}\nStatus: ${statusText}${eventsLine}${msgLine}`;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(fullText)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName) {
      setError('Please enter your full name to submit your RSVP.');
      return;
    }

    setError('');
    const newEntry: RsvpSubmission = {
      id: `rsvp-${Date.now()}`,
      guestName: trimmedName,
      guestCount: attending === 'yes' ? Math.max(1, guestCount) : 0,
      attending,
      selectedEvents: attending === 'yes' ? selectedEvents : [],
      message: message.trim(),
      submittedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    onSubmitRsvp(newEntry);
    setSubmittedEntry(newEntry);
    setGuestName('');
    setMessage('');
  };

  return (
    <section
      id="rsvp"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F3ECE0] border-t border-[#C69B45]/25"
      aria-labelledby="rsvp-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-medium mb-3">
            Kindly Respond
          </p>
          <h2
            id="rsvp-heading"
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A0E1C] mb-4"
          >
            {config.rsvpHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#5A4246]">
            {config.rsvpSubheading}
          </p>
        </div>

        {/* RSVP Form or Confirmation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="border border-[#C69B45]/45 bg-[#FDFBF7] p-6 sm:p-12 shadow-sm"
        >
          {submittedEntry ? (
            <div className="text-center py-6 space-y-6">
              <CheckCircle2 className="w-12 h-12 text-[#A97E2A] mx-auto" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#A97E2A] font-medium mb-2">
                  RSVP Confirmed
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A0E1C] mb-3">
                  Thank You, {submittedEntry.guestName}
                </h3>
                <p className="text-sm sm:text-base text-[#463437] max-w-lg mx-auto leading-relaxed">
                  {submittedEntry.attending === 'yes'
                    ? `We are overjoyed to welcome you (${submittedEntry.guestCount} guest${
                        submittedEntry.guestCount > 1 ? 's' : ''
                      }) to ${config.venueName}, Chikhli. Please also send your confirmation on WhatsApp so our hospitality team can coordinate your welcome.`
                    : `Thank you for letting us know. We will miss having you with us in person, and we warmly treasure your blessings for ${config.brideName} and ${config.groomName}.`}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={buildWhatsAppLink(submittedEntry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#256D45] hover:bg-[#1E5938] text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmittedEntry(null)}
                  className="px-5 py-3 min-h-[44px] border border-[#4A0E1C]/35 hover:border-[#4A0E1C] text-[#4A0E1C] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Submit Another RSVP
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {error && (
                <div
                  role="alert"
                  className="border border-[#631629]/40 bg-[#4A0E1C]/5 px-4 py-3 text-sm text-[#4A0E1C]"
                >
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="rsvp-name"
                    className="block text-xs font-semibold tracking-wide uppercase text-[#231416] mb-2"
                  >
                    Guest / Family Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    placeholder="e.g., Aarav & Priya Mehta"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full border border-[#C69B45]/50 bg-white px-4 py-3 text-sm text-[#231416] placeholder:text-[#8E7A7D] focus:outline-none focus:border-[#4A0E1C]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="block text-xs font-semibold tracking-wide uppercase text-[#231416] mb-2"
                  >
                    Number of Guests
                  </label>
                  <select
                    id="rsvp-guests"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    disabled={attending === 'no'}
                    className="w-full border border-[#C69B45]/50 bg-white px-4 py-3 text-sm text-[#231416] disabled:opacity-50 focus:outline-none focus:border-[#4A0E1C]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Attendance Confirmation */}
              <div>
                <p className="text-xs font-semibold tracking-wide uppercase text-[#231416] mb-2.5">
                  Attendance Confirmation
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`px-4 py-3 text-sm font-medium border transition-colors text-left cursor-pointer ${
                      attending === 'yes'
                        ? 'border-[#4A0E1C] bg-[#4A0E1C] text-[#FAF6EF]'
                        : 'border-[#C69B45]/45 bg-white text-[#231416] hover:border-[#4A0E1C]'
                    }`}
                  >
                    Joyfully Accepts · We will be there
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`px-4 py-3 text-sm font-medium border transition-colors text-left cursor-pointer ${
                      attending === 'no'
                        ? 'border-[#4A0E1C] bg-[#4A0E1C] text-[#FAF6EF]'
                        : 'border-[#C69B45]/45 bg-white text-[#231416] hover:border-[#4A0E1C]'
                    }`}
                  >
                    Regretfully Declines · Sending warm wishes
                  </button>
                </div>
              </div>

              {/* Events Selection */}
              {attending === 'yes' && (
                <div>
                  <p className="text-xs font-semibold tracking-wide uppercase text-[#231416] mb-2.5">
                    Ceremonies Attending
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {config.events.map((ev) => {
                      const checked = selectedEvents.includes(ev.name);
                      return (
                        <label
                          key={ev.id}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 border text-sm cursor-pointer transition-colors ${
                            checked
                              ? 'border-[#4A0E1C]/60 bg-[#F3ECE0] text-[#231416]'
                              : 'border-[#C69B45]/35 bg-white text-[#5A4246]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleEvent(ev.name)}
                            className="accent-[#4A0E1C] w-4 h-4"
                          />
                          <span className="truncate">{ev.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Personal Message */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-xs font-semibold tracking-wide uppercase text-[#231416] mb-2"
                >
                  Personal Message &amp; Blessings
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  placeholder={`Write a warm blessing or arrival note for ${config.brideName} & ${config.groomName}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-[#C69B45]/50 bg-white px-4 py-3 text-sm text-[#231416] placeholder:text-[#8E7A7D] focus:outline-none focus:border-[#4A0E1C]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[46px] bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-sm font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4 text-[#E6CE97]" />
                  <span>Confirm RSVP</span>
                </button>

                <a
                  href={`https://wa.me/${config.rsvpWhatsappNumber.replace(
                    /[^\d]/g,
                    ''
                  )}?text=${encodeURIComponent(
                    `Namaste! Confirming RSVP for ${config.brideName} & ${config.groomName}'s wedding (${config.weddingDatesDisplay}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#256D45] hover:underline whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quick RSVP via WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </motion.div>

        {/* Guest Blessings & Confirmations Wall */}
        {rsvps.length > 0 && (
          <div className="mt-14">
            <LotusMandalaDivider className="mb-10 max-w-xs mx-auto" />
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-center text-[#4A0E1C] mb-6">
              Recent Wishes &amp; Confirmations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rsvps.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#C69B45]/35 bg-[#FDFBF7] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-serif text-xl font-semibold text-[#4A0E1C]">
                          {item.guestName}
                        </p>
                        <p className="text-xs text-[#685457]">
                          {item.attending === 'yes'
                            ? `Attending · ${item.guestCount} Guest${item.guestCount > 1 ? 's' : ''}`
                            : 'Sending Blessings'}
                          <span className="mx-1.5" aria-hidden="true">
                            ·
                          </span>
                          <span>{item.submittedAt}</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteRsvp(item.id)}
                        className="w-7 h-7 inline-flex items-center justify-center text-[#8E7A7D] hover:text-[#4A0E1C] cursor-pointer"
                        aria-label={`Remove RSVP from ${item.guestName}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {item.message && (
                      <p className="text-sm text-[#463437] italic mt-2">
                        &ldquo;{item.message}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
