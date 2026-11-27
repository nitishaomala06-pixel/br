import React from 'react';
import { Music, Pause, Play, SlidersHorizontal } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface FloatingDockProps {
  config: WeddingConfig;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenCustomize: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  config,
  isMusicPlaying,
  onToggleMusic,
  onOpenCustomize,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 max-w-[calc(100vw-2rem)]">
      <button
        type="button"
        onClick={onOpenCustomize}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 min-h-[42px] bg-[#FAF6EF]/95 backdrop-blur-md border border-[#C69B45]/50 hover:border-[#4A0E1C] text-[#4A0E1C] text-xs font-semibold shadow-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
        title="Customize Wedding Details"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#A97E2A]" />
        <span className="hidden sm:inline">Customize</span>
      </button>

      <button
        type="button"
        onClick={onToggleMusic}
        className="inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[42px] bg-[#4A0E1C]/95 backdrop-blur-md border border-[#C69B45]/60 hover:bg-[#631629] text-[#FAF6EF] text-xs font-medium shadow-md transition-colors cursor-pointer max-w-[230px]"
        aria-label={isMusicPlaying ? 'Pause wedding background music' : 'Play wedding background music'}
      >
        {isMusicPlaying ? (
          <Pause className="w-3.5 h-3.5 text-[#E6CE97] shrink-0" />
        ) : (
          <Play className="w-3.5 h-3.5 text-[#E6CE97] shrink-0" />
        )}
        <span className="truncate">{config.musicTrackName}</span>
        <Music className="w-3.5 h-3.5 text-[#E6CE97]/80 shrink-0" />
      </button>
    </div>
  );
};
