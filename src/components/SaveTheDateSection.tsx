import React, { useEffect, useRef, useState } from 'react';
import { CalendarPlus, Download, RotateCcw, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { LotusMandalaDivider } from './RoyalMotifs';

interface SaveTheDateSectionProps {
  config: WeddingConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  if (Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false };
  }
  const diff = target - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isPast: false };
}

export const SaveTheDateSection: React.FC<SaveTheDateSectionProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    computeTimeLeft(config.countdownTargetIso)
  );
  const [revealed, setRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const strokeCountRef = useRef(0);

  useEffect(() => {
    setTimeLeft(computeTimeLeft(config.countdownTargetIso));
    const timer = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(config.countdownTargetIso));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.countdownTargetIso]);

  const paintFoil = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B98C35');
    grad.addColorStop(0.28, '#E7CF94');
    grad.addColorStop(0.54, '#C69B45');
    grad.addColorStop(0.78, '#EED9A5');
    grad.addColorStop(1, '#A77B27');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 250, 235, 0.16)';
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i - height, height);
      ctx.stroke();
    }

    ctx.fillStyle = '#320812';
    ctx.font = '600 18px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Gently to Reveal the Date', width / 2, height / 2 - 6);
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(50, 8, 18, 0.78)';
    ctx.fillText('Drag across the gold foil with cursor or finger', width / 2, height / 2 + 18);

    strokeCountRef.current = 0;
    setScratchPercent(0);
    setRevealed(false);
  };

  useEffect(() => {
    paintFoil();
  }, []);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    strokeCountRef.current += 1;
    if (strokeCountRef.current % 6 === 0) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      const stride = 16;
      let sampled = 0;
      for (let i = 3; i < imageData.length; i += stride) {
        sampled += 1;
        if (imageData[i] < 128) transparentPixels += 1;
      }
      const pct = Math.round((transparentPixels / Math.max(sampled, 1)) * 100);
      setScratchPercent(pct);
      if (pct >= 45) {
        setRevealed(true);
      }
    }
  };

  const googleCalendarUrl = (() => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `${config.brideName} & ${config.groomName} — Wedding Celebrations`,
      dates: `${config.calendarStartIso}/${config.calendarEndIso}`,
      details: `${config.guideSubtitle}\n\n${config.introColourStory}`,
      location: config.venueAddress,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  })();

  const handleDownloadIcs = () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Royal Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `DTSTART:${config.calendarStartIso}`,
      `DTEND:${config.calendarEndIso}`,
      `SUMMARY:${config.brideName} & ${config.groomName} Wedding Celebrations`,
      `DESCRIPTION:${config.guideSubtitle.replace(/\n/g, ' ')}`,
      `LOCATION:${config.venueAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.brideName}-${config.groomName}-Wedding.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="save-the-date"
      className="py-20 sm:py-28 px-4 sm:px-8 bg-[#F3ECE0] border-y border-[#C69B45]/25"
      aria-labelledby="save-date-heading"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-xs tracking-[0.24em] uppercase text-[#A97E2A] font-medium mb-3">
          Save The Date
        </p>
        <h2
          id="save-date-heading"
          className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A0E1C] mb-4"
        >
          Mark Your Calendar for Our Celebration
        </h2>
        <p className="text-sm sm:text-base text-[#5A4246] max-w-xl mx-auto mb-10">
          Scratch the golden foil seal below to uncover the wedding dates, then add the celebration to your calendar.
        </p>

        {/* Interactive Scratch-to-Reveal Card */}
        <div className="mx-auto max-w-lg mb-12">
          <div className="relative overflow-hidden border border-[#C69B45]/60 bg-[#4A0E1C] text-[#FAF6EF] shadow-lg select-none">
            <div className="px-6 py-10 sm:py-12 flex flex-col items-center justify-center min-h-[210px]">
              <p className="text-xs tracking-[0.24em] uppercase text-[#E6CE97] mb-2">
                Save The Dates
              </p>
              <p className="font-serif italic text-3xl sm:text-4xl font-semibold text-[#FAF6EF] mb-2">
                {config.weddingDatesDisplay}
              </p>
              <p className="text-sm text-[#E6CE97]/90">
                {config.brideName} &amp; {config.groomName} · {config.venueAddress}
              </p>
            </div>

            <canvas
              ref={canvasRef}
              width={520}
              height={220}
              onPointerDown={(e) => {
                isDrawingRef.current = true;
                (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
                scratchAt(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (!isDrawingRef.current) return;
                scratchAt(e.clientX, e.clientY);
              }}
              onPointerUp={() => {
                isDrawingRef.current = false;
              }}
              onPointerCancel={() => {
                isDrawingRef.current = false;
              }}
              className={`absolute inset-0 h-full w-full touch-none cursor-crosshair transition-opacity duration-500 ${
                revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label="Scratch-to-reveal wedding date gold foil card"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#685457] px-1">
            <span>
              {revealed
                ? 'Date revealed · We cannot wait to celebrate together'
                : `Foil scratched: ${scratchPercent}%`}
            </span>
            <div className="flex items-center gap-3">
              {!revealed ? (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-1 font-medium text-[#4A0E1C] hover:text-[#A97E2A] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reveal Date</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={paintFoil}
                  className="inline-flex items-center gap-1 font-medium text-[#4A0E1C] hover:text-[#A97E2A] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Foil</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="mx-auto max-w-3xl mb-10">
          {timeLeft.isPast ? (
            <p className="font-serif text-2xl sm:text-3xl text-[#4A0E1C]">
              The wedding celebrations are underway!
            </p>
          ) : (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5"
              role="timer"
              aria-live="off"
              aria-label="Countdown to wedding day"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="border border-[#C69B45]/40 bg-[#FAF6EF] py-5 px-4"
                >
                  <div className="font-serif text-4xl sm:text-5xl font-semibold text-[#4A0E1C] tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="mt-2 text-xs tracking-[0.2em] uppercase text-[#685457]">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <LotusMandalaDivider className="my-8 max-w-xs mx-auto" />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-sm font-medium tracking-wide transition-colors whitespace-nowrap shrink-0"
          >
            <CalendarPlus className="w-4 h-4 text-[#E6CE97]" />
            <span>Add to Google Calendar</span>
          </a>
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] border border-[#4A0E1C]/35 hover:border-[#4A0E1C] bg-[#FAF6EF] text-[#4A0E1C] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Calendar (.ics)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
