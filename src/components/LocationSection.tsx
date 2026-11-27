import React, { useState } from 'react';
import { Check, Copy, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface LocationSectionProps {
  config: WeddingConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  const [selectedHubId, setSelectedHubId] = useState(
    config.travelHubs[0]?.id ?? 'current'
  );
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const selectedHub =
    config.travelHubs.find((h) => h.id === selectedHubId) ?? config.travelHubs[0];

  const getDirectionsUrl = () => {
    const params = new URLSearchParams({
      api: '1',
      destination: config.venueMapQuery,
    });
    if (selectedHub?.originQuery) {
      params.set('origin', selectedHub.originQuery);
    }
    return `https://www.google.com/maps/dir/?${params.toString()}`;
  };

  const viewPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.venueMapQuery
  )}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(config.venueAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback copy if clipboard restricted
      setCopied(false);
    }
  };

  return (
    <section
      id="location"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6EF] border-t border-[#C69B45]/25"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-medium mb-3">
            Wedding Location
          </p>
          <h2
            id="location-heading"
            className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A0E1C] mb-4"
          >
            {config.venueName}, {config.venueCityState}
          </h2>
          <p className="text-sm sm:text-base text-[#5A4246]">
            Plan your journey seamlessly with direct Google Maps navigation and regional transit distances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-[#C69B45]/45 bg-[#FAF6EF]">
          {/* Venue Architectural Image & Pin Overlay */}
          <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] bg-[#320812] overflow-hidden">
            {!imgError && config.heroMandapImage ? (
              <img
                src={config.heroMandapImage}
                alt={`${config.venueName} wedding venue`}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-[#4A0E1C] text-[#E6CE97] p-8 font-serif text-3xl">
                {config.venueName}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-[#FAF6EF]">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#E6CE97] mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Destination Venue</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                {config.venueName}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF6EF]/85 mt-1">
                {config.venueAddress}
              </p>
            </div>
          </div>

          {/* Interactive Directions & Travel Details */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A0E1C] mb-3">
                Arriving at {config.venueName}
              </h3>
              <p className="text-sm sm:text-base text-[#463437] leading-relaxed mb-6">
                {config.venueLandmarkNotes}
              </p>

              {/* Starting Point Selector */}
              <div className="mb-6">
                <label
                  htmlFor="directions-origin"
                  className="block text-xs font-semibold tracking-wide uppercase text-[#685457] mb-2"
                >
                  Choose Starting Point for Route
                </label>
                <select
                  id="directions-origin"
                  value={selectedHubId}
                  onChange={(e) => setSelectedHubId(e.target.value)}
                  className="w-full border border-[#C69B45]/50 bg-white px-4 py-2.5 text-sm text-[#231416] focus:outline-none focus:border-[#4A0E1C]"
                >
                  {config.travelHubs.map((hub) => (
                    <option key={hub.id} value={hub.id}>
                      {hub.name} — {hub.distanceNote}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nearby Connectivity Summary */}
              <div className="border-t border-[#C69B45]/25 pt-4 mb-6 space-y-2">
                {config.travelHubs
                  .filter((h) => h.id !== 'current')
                  .slice(0, 3)
                  .map((hub) => (
                    <div
                      key={hub.id}
                      className="flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm"
                    >
                      <span className="font-medium text-[#231416]">{hub.name}</span>
                      <span className="text-[#685457]">{hub.distanceNote}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <Navigation className="w-4 h-4 text-[#E6CE97]" />
                <span>Get Directions</span>
              </a>

              <a
                href={viewPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] border border-[#4A0E1C]/35 hover:border-[#4A0E1C] text-[#4A0E1C] text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 min-h-[44px] text-sm font-medium text-[#5A4246] hover:text-[#4A0E1C] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#A97E2A]" />
                    <span>Address Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
