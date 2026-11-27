export type EventIllustrationType =
  | 'haldi'
  | 'mehendi'
  | 'sangeet'
  | 'varmala'
  | 'pheras'
  | 'wedding'
  | 'reception'
  | 'custom';

export type EventThemeVariant =
  | 'haldi'
  | 'sangeet'
  | 'varmala'
  | 'pheras'
  | 'default';

export interface DressCodeSwatch {
  label: string;
  color: string;
  isMulticolour?: boolean;
  isMetallic?: boolean;
}

export interface WeddingEvent {
  id: string;
  dayGroup: 'day1' | 'day2';
  dayHeading: string;
  dayDateLabel: string;
  name: string;
  subtitle: string;
  introDescription?: string;
  timing: string;
  dateTimeDisplay: string;
  venue: string;
  description: string;
  dressCodeTitle?: string;
  dressCodeIntro?: string;
  dressCodeLines?: string[];
  dressCodeClosingLines?: string[];
  swatches?: DressCodeSwatch[];
  illustration: EventIllustrationType;
  themeVariant: EventThemeVariant;
  mapQuery: string;
}

export interface GoodToKnowCard {
  id: string;
  title: string;
  body: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface TravelHub {
  id: string;
  name: string;
  distanceNote: string;
  originQuery: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  brideHeading: string;
  groomHeading: string;
  brideBio: string;
  groomBio: string;
  ganeshDevanagariLine: string;
  ganeshTitle: string;
  welcomeLeadIn: string;
  guideSubtitle: string;
  weddingDatesDisplay: string;
  countdownTargetIso: string;
  calendarStartIso: string;
  calendarEndIso: string;
  introColourStory: string;
  brideFamilyTitle: string;
  brideParents: string;
  brideFamilyNote: string;
  groomFamilyTitle: string;
  groomParents: string;
  groomFamilyNote: string;
  venueName: string;
  venueAddress: string;
  venueCityState: string;
  venueMapQuery: string;
  venueLandmarkNotes: string;
  travelHubs: TravelHub[];
  goodToKnowHeading: string;
  goodToKnowCards: GoodToKnowCard[];
  vidhiNoteHeading: string;
  vidhiPersonalNote: string;
  rsvpHeading: string;
  rsvpSubheading: string;
  rsvpWhatsappNumber: string;
  thankYouMessage: string;
  thankYouSignoff: string;
  thankYouSubtext: string;
  heroMandapImage: string;
  musicTrackName: string;
  musicMode: 'classical-sitar' | 'custom';
  customAudioUrl: string;
  events: WeddingEvent[];
  photos: GalleryPhoto[];
}

export interface RsvpSubmission {
  id: string;
  guestName: string;
  guestCount: number;
  attending: 'yes' | 'no';
  selectedEvents: string[];
  message: string;
  submittedAt: string;
}
