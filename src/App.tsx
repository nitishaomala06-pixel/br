import { useEffect, useState } from 'react';
import { DEFAULT_WEDDING_CONFIG } from './data/defaultWeddingConfig';
import { GalleryPhoto, RsvpSubmission, WeddingConfig, WeddingEvent } from './types/wedding';
import { weddingMusicEngine } from './utils/musicEngine';
import { FloatingPetalsCanvas } from './components/RoyalMotifs';
import { WelcomeCurtain } from './components/WelcomeCurtain';
import { Navbar } from './components/Navbar';
import { InvitationCardSection } from './components/InvitationCardSection';
import { SaveTheDateSection } from './components/SaveTheDateSection';
import { CelebrationsSection } from './components/CelebrationsSection';
import { GoodToKnowAndNoteSection } from './components/GoodToKnowAndNoteSection';
import { OurStorySection } from './components/OurStorySection';
import { LocationSection } from './components/LocationSection';
import { RsvpSection } from './components/RsvpSection';
import { ThankYouFooter } from './components/ThankYouFooter';
import { FloatingDock } from './components/FloatingDock';
import { CustomizeStudioModal } from './components/CustomizeStudioModal';

const CONFIG_STORAGE_KEY = 'vidhi_yash_wedding_config_v7';
const LEGACY_STORAGE_KEYS = [
  'vidhi_yash_wedding_config_v6',
  'vidhi_yash_wedding_config_v5',
  'vidhi_yash_wedding_config_v4',
  'vidhi_yash_wedding_config_v3',
];
const RSVP_STORAGE_KEY = 'vidhi_yash_wedding_rsvps_v1';

function sanitizeSurnameText(value: string): string {
  return value.replace(/khinvensra/gi, (match) =>
    match === match.toUpperCase()
      ? 'KHINVESRA'
      : match[0] === 'K'
      ? 'Khinvesra'
      : 'khinvesra'
  );
}

function sanitizeConfig(cfg: WeddingConfig): WeddingConfig {
  return {
    ...cfg,
    brideName: sanitizeSurnameText(cfg.brideName),
    groomName: sanitizeSurnameText(cfg.groomName),
    brideBio: sanitizeSurnameText(cfg.brideBio),
    brideParents: sanitizeSurnameText(cfg.brideParents),
    thankYouMessage: sanitizeSurnameText(cfg.thankYouMessage),
    thankYouSubtext: sanitizeSurnameText(cfg.thankYouSubtext),
    photos: cfg.photos.map((p) => ({
      ...p,
      caption: sanitizeSurnameText(p.caption),
    })),
  };
}

function loadStoredConfig(): WeddingConfig {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<WeddingConfig>;
      return sanitizeConfig({ ...DEFAULT_WEDDING_CONFIG, ...parsed });
    }
    // Migrate uploaded couple photos, audio preference & WhatsApp number from v4/v3
    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      const prevRaw = localStorage.getItem(legacyKey);
      if (prevRaw) {
        const prevParsed = JSON.parse(prevRaw) as Partial<WeddingConfig>;
        return sanitizeConfig({
          ...DEFAULT_WEDDING_CONFIG,
          photos: Array.isArray(prevParsed.photos) ? prevParsed.photos : [],
          rsvpWhatsappNumber:
            prevParsed.rsvpWhatsappNumber || DEFAULT_WEDDING_CONFIG.rsvpWhatsappNumber,
          musicMode: prevParsed.musicMode || DEFAULT_WEDDING_CONFIG.musicMode,
          customAudioUrl:
            prevParsed.customAudioUrl ?? DEFAULT_WEDDING_CONFIG.customAudioUrl,
          musicTrackName:
            prevParsed.musicTrackName || DEFAULT_WEDDING_CONFIG.musicTrackName,
        });
      }
    }
    return DEFAULT_WEDDING_CONFIG;
  } catch {
    return DEFAULT_WEDDING_CONFIG;
  }
}

function loadStoredRsvps(): RsvpSubmission[] {
  try {
    const raw = localStorage.getItem(RSVP_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RsvpSubmission[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [config, setConfig] = useState<WeddingConfig>(loadStoredConfig);
  const [rsvps, setRsvps] = useState<RsvpSubmission[]>(loadStoredRsvps);
  const [curtainOpened, setCurtainOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage quota overflow gracefully
    }
    weddingMusicEngine.configure(config.musicMode, config.customAudioUrl);
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(rsvps));
    } catch {
      // Ignore storage error
    }
  }, [rsvps]);

  useEffect(() => {
    document.title = `${config.brideName} & ${config.groomName} · ${config.weddingDatesDisplay}`;
  }, [config.brideName, config.groomName, config.weddingDatesDisplay]);

  const handleEnterInvitation = async (withMusic: boolean) => {
    setCurtainOpened(true);
    if (withMusic) {
      await weddingMusicEngine.play();
      setIsMusicPlaying(weddingMusicEngine.isPlaying());
    }
  };

  const handleToggleMusic = async () => {
    const playing = await weddingMusicEngine.toggle();
    setIsMusicPlaying(playing);
  };

  const handleUpdateEvent = (updated: WeddingEvent) => {
    setConfig((prev) => ({
      ...prev,
      events: prev.events.map((ev) => (ev.id === updated.id ? updated : ev)),
    }));
  };

  const handleSetPhotoAtSlot = (slotIndex: 0 | 1, photo: GalleryPhoto) => {
    setConfig((prev) => {
      const p1 =
        slotIndex === 0
          ? photo
          : prev.photos.find((p) => p.id === 'couple-photo-1');
      const p2 =
        slotIndex === 1
          ? photo
          : prev.photos.find((p) => p.id === 'couple-photo-2');
      return {
        ...prev,
        photos: [p1, p2].filter((p): p is GalleryPhoto => Boolean(p)),
      };
    });
  };

  const handleSubmitRsvp = (entry: RsvpSubmission) => {
    setRsvps((prev) => [entry, ...prev]);
  };

  const handleDeleteRsvp = (id: string) => {
    setRsvps((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDefaults = () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    setConfig(DEFAULT_WEDDING_CONFIG);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#231416] relative">
      <FloatingPetalsCanvas density={20} />

      <WelcomeCurtain
        config={config}
        isOpen={curtainOpened}
        onEnter={handleEnterInvitation}
      />

      <Navbar config={config} />

      <main>
        <InvitationCardSection
          config={config}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        <SaveTheDateSection config={config} />

        <CelebrationsSection
          config={config}
          onUpdateEvent={handleUpdateEvent}
        />

        <GoodToKnowAndNoteSection config={config} />

        <OurStorySection
          config={config}
          onSetPhotoAtSlot={handleSetPhotoAtSlot}
        />

        <LocationSection config={config} />

        <RsvpSection
          config={config}
          rsvps={rsvps}
          onSubmitRsvp={handleSubmitRsvp}
          onDeleteRsvp={handleDeleteRsvp}
        />
      </main>

      <ThankYouFooter config={config} />

      {curtainOpened && (
        <FloatingDock
          config={config}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />
      )}

      {isCustomizeOpen && (
        <CustomizeStudioModal
          isOpen={isCustomizeOpen}
          config={config}
          onClose={() => setIsCustomizeOpen(false)}
          onSaveConfig={(next) => setConfig(next)}
          onResetDefaults={handleResetDefaults}
        />
      )}
    </div>
  );
}
