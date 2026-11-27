import React, { useRef, useState } from 'react';
import {
  Check,
  Download,
  ImagePlus,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  EventIllustrationType,
  GalleryPhoto,
  WeddingConfig,
  WeddingEvent,
} from '../types/wedding';

interface CustomizeStudioModalProps {
  isOpen: boolean;
  config: WeddingConfig;
  onClose: () => void;
  onSaveConfig: (next: WeddingConfig) => void;
  onResetDefaults: () => void;
}

type TabKey = 'couple' | 'events' | 'story' | 'media' | 'venue';

export const CustomizeStudioModal: React.FC<CustomizeStudioModalProps> = ({
  isOpen,
  config,
  onClose,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [draft, setDraft] = useState<WeddingConfig>(config);
  const [activeTab, setActiveTab] = useState<TabKey>('couple');
  const [statusMessage, setStatusMessage] = useState('');
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const audioFileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    window.setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(draft);
    onClose();
  };

  const updateEventField = (
    idx: number,
    field: keyof WeddingEvent,
    value: string
  ) => {
    const nextEvents = [...draft.events];
    nextEvents[idx] = { ...nextEvents[idx], [field]: value };
    setDraft({ ...draft, events: nextEvents });
  };

  const addEvent = () => {
    const newEv: WeddingEvent = {
      id: `event-${Date.now()}`,
      dayGroup: 'day2',
      dayHeading: 'DAY TWO',
      dayDateLabel: 'Saturday, 17 January 2027',
      name: 'NEW CEREMONY',
      subtitle: 'Family Gathering',
      timing: 'Afternoon',
      dateTimeDisplay: 'Saturday, 17 January 2027 | Afternoon',
      venue: draft.venueAddress,
      description: 'Celebration details and blessings.',
      dressCodeTitle: 'DRESS CODE',
      dressCodeIntro: 'Traditional Festive',
      illustration: 'custom',
      themeVariant: 'default',
      mapQuery: draft.venueMapQuery,
    };
    setDraft({ ...draft, events: [...draft.events, newEv] });
  };

  const removeEvent = (id: string) => {
    setDraft({
      ...draft,
      events: draft.events.filter((ev) => ev.id !== id),
    });
  };

  const handleUploadSingleImage = (
    file: File | undefined,
    onDone: (dataUrl: string) => void
  ) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onDone(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSetGallerySlot = (slotIndex: 0 | 1, file: File | undefined) => {
    handleUploadSingleImage(file, (dataUrl) => {
      const p1 =
        slotIndex === 0
          ? {
              id: 'couple-photo-1',
              url: dataUrl,
              caption: `${draft.brideName} & ${draft.groomName} — Standing Together`,
              category: 'Wedding Gallery',
            }
          : draft.photos.find((p) => p.id === 'couple-photo-1');
      const p2 =
        slotIndex === 1
          ? {
              id: 'couple-photo-2',
              url: dataUrl,
              caption: `${draft.brideName} & ${draft.groomName} — Romantic Moment`,
              category: 'Wedding Gallery',
            }
          : draft.photos.find((p) => p.id === 'couple-photo-2');
      setDraft({
        ...draft,
        photos: [p1, p2].filter((p): p is GalleryPhoto => Boolean(p)),
      });
      showToast(`Updated Photograph ${slotIndex + 1}.`);
    });
  };

  const handleUploadAudioFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setDraft({
      ...draft,
      musicMode: 'custom',
      customAudioUrl: objectUrl,
      musicTrackName: file.name.replace(/\.[^.]+$/, ''),
    });
    showToast(`Loaded audio file: ${file.name}`);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${draft.brideName}-${draft.groomName}-wedding-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as WeddingConfig;
        if (parsed.brideName && parsed.groomName && Array.isArray(parsed.events)) {
          setDraft({
            ...parsed,
            brideName: parsed.brideName.replace(/khinvensra/gi, 'Khinvesra'),
            brideBio: parsed.brideBio.replace(/khinvensra/gi, 'Khinvesra'),
            brideParents: parsed.brideParents.replace(/khinvensra/gi, 'Khinvesra'),
          });
          showToast('Imported wedding configuration JSON.');
        }
      } catch {
        showToast('Invalid JSON configuration file.');
      }
    };
    reader.readAsText(file);
  };

  const updatePhotoField = (
    idx: number,
    field: keyof GalleryPhoto,
    value: string
  ) => {
    const next = [...draft.photos];
    next[idx] = { ...next[idx], [field]: value };
    setDraft({ ...draft, photos: next });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#180509]/75 backdrop-blur-sm p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-studio-title"
    >
      <div className="w-full max-w-4xl border border-[#C69B45]/55 bg-[#FAF6EF] shadow-2xl flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-[#C69B45]/30 bg-[#FDFBF7]">
          <div>
            <h2
              id="customize-studio-title"
              className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A0E1C]"
            >
              Customize Wedding Invitation
            </h2>
            <p className="text-xs text-[#685457]">
              Edit names, dates, families, celebrations, personal notes, photographs, music, venue, and RSVP WhatsApp settings.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 inline-flex items-center justify-center text-[#5A4246] hover:text-[#231416] cursor-pointer"
            aria-label="Close customization studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 px-6 pt-3 pb-0 border-b border-[#C69B45]/25 bg-[#F3ECE0] overflow-x-auto">
          {[
            { id: 'couple', label: 'Couple & Intro' },
            { id: 'events', label: 'Celebrations' },
            { id: 'story', label: 'Story & Notes' },
            { id: 'media', label: 'Photos & Music' },
            { id: 'venue', label: 'Venue & WhatsApp' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'border-[#4A0E1C] text-[#4A0E1C] bg-[#FAF6EF]'
                  : 'border-transparent text-[#685457] hover:text-[#231416]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {statusMessage && (
          <div className="px-6 py-2 bg-[#4A0E1C] text-[#E6CE97] text-xs font-medium">
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'couple' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#231416] mb-1">
                    Bride Name
                  </label>
                  <input
                    type="text"
                    value={draft.brideName}
                    onChange={(e) => setDraft({ ...draft, brideName: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#231416] mb-1">
                    Groom Name
                  </label>
                  <input
                    type="text"
                    value={draft.groomName}
                    onChange={(e) => setDraft({ ...draft, groomName: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#231416] mb-1">
                    Wedding Dates Display
                  </label>
                  <input
                    type="text"
                    value={draft.weddingDatesDisplay}
                    onChange={(e) =>
                      setDraft({ ...draft, weddingDatesDisplay: e.target.value })
                    }
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#231416] mb-1">
                    Countdown Target (ISO Date/Time)
                  </label>
                  <input
                    type="text"
                    value={draft.countdownTargetIso}
                    onChange={(e) =>
                      setDraft({ ...draft, countdownTargetIso: e.target.value })
                    }
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Guide Subtitle
                </label>
                <input
                  type="text"
                  value={draft.guideSubtitle}
                  onChange={(e) => setDraft({ ...draft, guideSubtitle: e.target.value })}
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#231416] mb-1">
                  Introduction Colour Story Message
                </label>
                <textarea
                  rows={3}
                  value={draft.introColourStory}
                  onChange={(e) =>
                    setDraft({ ...draft, introColourStory: e.target.value })
                  }
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#C69B45]/25">
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[#4A0E1C]">
                    Bride’s Parents &amp; Family
                  </label>
                  <input
                    type="text"
                    value={draft.brideParents}
                    onChange={(e) => setDraft({ ...draft, brideParents: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={draft.brideFamilyNote}
                    onChange={(e) =>
                      setDraft({ ...draft, brideFamilyNote: e.target.value })
                    }
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[#4A0E1C]">
                    Groom’s Parents &amp; Family
                  </label>
                  <input
                    type="text"
                    value={draft.groomParents}
                    onChange={(e) => setDraft({ ...draft, groomParents: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                  <input
                    type="text"
                    value={draft.groomFamilyNote}
                    onChange={(e) =>
                      setDraft({ ...draft, groomFamilyNote: e.target.value })
                    }
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#5A4246]">
                  Customize ceremony names, subtitles, timings, and descriptions.
                </p>
                <button
                  type="button"
                  onClick={addEvent}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#4A0E1C] text-[#FAF6EF] text-xs font-medium cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Event</span>
                </button>
              </div>

              {draft.events.map((ev, idx) => (
                <div
                  key={ev.id}
                  className="border border-[#C69B45]/40 bg-white p-4 space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-serif text-lg font-semibold text-[#4A0E1C]">
                      {ev.name} ({ev.dayHeading})
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEvent(ev.id)}
                      className="text-xs text-[#685457] hover:text-[#4A0E1C] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={ev.name}
                      onChange={(e) => updateEventField(idx, 'name', e.target.value)}
                      placeholder="Event Name"
                      className="border border-[#C69B45]/45 px-3 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={ev.subtitle}
                      onChange={(e) => updateEventField(idx, 'subtitle', e.target.value)}
                      placeholder="Subtitle"
                      className="border border-[#C69B45]/45 px-3 py-1.5 text-sm"
                    />
                    <input
                      type="text"
                      value={ev.dateTimeDisplay}
                      onChange={(e) =>
                        updateEventField(idx, 'dateTimeDisplay', e.target.value)
                      }
                      placeholder="Date & Time"
                      className="border border-[#C69B45]/45 px-3 py-1.5 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={ev.introDescription ?? ''}
                      onChange={(e) =>
                        updateEventField(idx, 'introDescription', e.target.value)
                      }
                      placeholder="Intro Highlight"
                      className="border border-[#C69B45]/45 px-3 py-1.5 text-sm"
                    />
                    <select
                      value={ev.illustration}
                      onChange={(e) =>
                        updateEventField(
                          idx,
                          'illustration',
                          e.target.value as EventIllustrationType
                        )
                      }
                      className="border border-[#C69B45]/45 px-3 py-1.5 text-sm bg-white"
                    >
                      <option value="haldi">Illustration: Haldi</option>
                      <option value="sangeet">Illustration: Sangeet</option>
                      <option value="varmala">Illustration: Varmala</option>
                      <option value="pheras">Illustration: Pheras</option>
                      <option value="custom">Illustration: Festive</option>
                    </select>
                  </div>

                  <textarea
                    rows={3}
                    value={ev.description}
                    onChange={(e) => updateEventField(idx, 'description', e.target.value)}
                    className="w-full border border-[#C69B45]/45 px-3 py-1.5 text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'story' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#4A0E1C] mb-1">
                  Personal Note ({draft.vidhiNoteHeading})
                </label>
                <textarea
                  rows={4}
                  value={draft.vidhiPersonalNote}
                  onChange={(e) =>
                    setDraft({ ...draft, vidhiPersonalNote: e.target.value })
                  }
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {draft.brideHeading} — {draft.brideName}
                  </label>
                  <textarea
                    rows={5}
                    value={draft.brideBio}
                    onChange={(e) => setDraft({ ...draft, brideBio: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    {draft.groomHeading} — {draft.groomName}
                  </label>
                  <textarea
                    rows={5}
                    value={draft.groomBio}
                    onChange={(e) => setDraft({ ...draft, groomBio: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="border border-[#C69B45]/40 bg-white p-5 space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#4A0E1C]">
                  Background Wedding Music
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        musicMode: 'classical-sitar',
                        musicTrackName: 'Raga Yaman · Royal Sitar & Tanpura',
                      })
                    }
                    className={`p-3 border text-left text-sm cursor-pointer ${
                      draft.musicMode === 'classical-sitar'
                        ? 'border-[#4A0E1C] bg-[#F3ECE0] font-medium'
                        : 'border-[#C69B45]/40'
                    }`}
                  >
                    Built-in Indian Classical Sitar &amp; Tanpura
                  </button>
                  <button
                    type="button"
                    onClick={() => setDraft({ ...draft, musicMode: 'custom' })}
                    className={`p-3 border text-left text-sm cursor-pointer ${
                      draft.musicMode === 'custom'
                        ? 'border-[#4A0E1C] bg-[#F3ECE0] font-medium'
                        : 'border-[#C69B45]/40'
                    }`}
                  >
                    Custom Audio File or MP3 URL
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Track Display Name
                    </label>
                    <input
                      type="text"
                      value={draft.musicTrackName}
                      onChange={(e) =>
                        setDraft({ ...draft, musicTrackName: e.target.value })
                      }
                      className="w-full border border-[#C69B45]/45 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Custom Audio URL (MP3/WAV)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={draft.customAudioUrl}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            musicMode: 'custom',
                            customAudioUrl: e.target.value,
                          })
                        }
                        placeholder="https://example.com/shehnai.mp3"
                        className="flex-1 border border-[#C69B45]/45 px-3 py-2 text-sm"
                      />
                      <input
                        ref={audioFileInputRef}
                        type="file"
                        accept="audio/*"
                        onChange={handleUploadAudioFile}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => audioFileInputRef.current?.click()}
                        className="px-3 py-2 border border-[#4A0E1C]/40 text-xs font-medium text-[#4A0E1C] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Upload Audio
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[0, 1].map((slotIdx) => (
                  <div
                    key={slotIdx}
                    className="border border-[#C69B45]/40 bg-white p-4 space-y-2"
                  >
                    <p className="text-xs font-semibold text-[#4A0E1C]">
                      Couple Photograph {slotIdx + 1}
                    </p>
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F3ECE0] text-xs font-medium text-[#4A0E1C] cursor-pointer">
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>Upload Photo {slotIdx + 1}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleSetGallerySlot(slotIdx as 0 | 1, e.target.files?.[0])
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>

              {draft.photos.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#4A0E1C]">
                    Photograph Captions
                  </p>
                  {draft.photos.map((p, idx) => (
                    <div
                      key={p.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border border-[#C69B45]/35 bg-white p-3"
                    >
                      <img
                        src={p.url}
                        alt={p.caption}
                        className="w-16 h-12 object-cover shrink-0 border border-[#C69B45]/30"
                      />
                      <input
                        type="text"
                        value={p.caption}
                        onChange={(e) => updatePhotoField(idx, 'caption', e.target.value)}
                        className="flex-1 w-full border border-[#C69B45]/40 px-3 py-1.5 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'venue' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Venue Name</label>
                  <input
                    type="text"
                    value={draft.venueName}
                    onChange={(e) => setDraft({ ...draft, venueName: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    City &amp; State
                  </label>
                  <input
                    type="text"
                    value={draft.venueCityState}
                    onChange={(e) =>
                      setDraft({ ...draft, venueCityState: e.target.value })
                    }
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Full Address</label>
                <input
                  type="text"
                  value={draft.venueAddress}
                  onChange={(e) => setDraft({ ...draft, venueAddress: e.target.value })}
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Google Maps Destination Query
                </label>
                <input
                  type="text"
                  value={draft.venueMapQuery}
                  onChange={(e) => setDraft({ ...draft, venueMapQuery: e.target.value })}
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#C69B45]/25">
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    RSVP WhatsApp Number (with country code, digits only)
                  </label>
                  <input
                    type="text"
                    value={draft.rsvpWhatsappNumber}
                    onChange={(e) =>
                      setDraft({ ...draft, rsvpWhatsappNumber: e.target.value })
                    }
                    placeholder="919876543210"
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    RSVP Section Heading
                  </label>
                  <input
                    type="text"
                    value={draft.rsvpHeading}
                    onChange={(e) => setDraft({ ...draft, rsvpHeading: e.target.value })}
                    className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Final Closing Message
                </label>
                <input
                  type="text"
                  value={draft.thankYouMessage}
                  onChange={(e) =>
                    setDraft({ ...draft, thankYouMessage: e.target.value })
                  }
                  className="w-full border border-[#C69B45]/45 bg-white px-3.5 py-2 text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#C69B45]/25">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#C69B45]/60 bg-white text-xs font-medium text-[#231416] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Config JSON</span>
                </button>

                <input
                  ref={importInputRef}
                  type="file"
                  accept="application/json"
                  onChange={handleImportJson}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => importInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#C69B45]/60 bg-white text-xs font-medium text-[#231416] cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import Config JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onResetDefaults();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#631629] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}

          <div className="sticky bottom-0 flex items-center justify-end gap-3 pt-4 pb-1 bg-[#FAF6EF] border-t border-[#C69B45]/30">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-[#5A4246] hover:text-[#231416] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A0E1C] hover:bg-[#631629] text-[#FAF6EF] text-sm font-semibold cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#E6CE97]" />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
