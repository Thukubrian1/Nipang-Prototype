export interface EventSection {
  basicInfo: boolean;
  dateTime: boolean;
  pricingTickets: boolean;
  mediaUpload: boolean;
  additionalInfo: boolean;
}

export interface EventFormData {
  // Basic Info
  type: 'event' | 'venue';
  name: string;
  description: string;
  category: string;
  subCategory?: string;
  location: string;
  locationUrl?: string;

  // Date & Time
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  recurrenceDays?: string[];
  recurrenceDescription?: string;
  recurrenceEndDate?: string;

  // Pricing & Tickets
  priceType: 'free' | 'fixed';
  totalTickets?: number;
  ticketUrl?: string;
  availableFrom?: string;
  availableTo?: string;
  prices?: PriceItem[];

  // Media
  coverImage?: File;
  galleryMedia?: File[];

  // Additional Info
  additionalDescription?: string;
}

export interface PriceItem {
  id: string;
  name: string;
  price: number;
  availableTickets: number;
  ticketType: 'normal' | 'vip' | 'early-bird';
  ticketUrl: string;
  availableFrom: string;
  availableTo: string;
}

export const CATEGORIES = [
  'Clubbing & Concerts',
  'Outdoor Adventures',
  'Romantic, Eats & Dates',
  'Spiritual Uplifting',
  'Kids & Family Outings',
  'Wellness'
];

export const SUB_CATEGORIES: { [key: string]: string[] } = {
  'Outdoor Adventures': [
    'Hiking',
    'Camping',
    'Safari',
    'Cycling',
    'Nature walks',
    'Water sports'
  ],
  'Clubbing & Concerts': [
    'Live Music',
    'DJ Night',
    'Concert',
    'Club Event',
    'Festival'
  ],
  'Romantic, Eats & Dates': [
    'Fine Dining',
    'Casual Dining',
    'Romantic Getaway',
    'Wine Tasting',
    'Couples Activities'
  ],
  'Spiritual Uplifting': [
    'Church Service',
    'Meditation',
    'Yoga',
    'Retreat',
    'Prayer Meeting'
  ],
  'Kids & Family Outings': [
    'Kids Party',
    'Family Day',
    'Educational Tour',
    'Amusement Park',
    'Zoo Visit'
  ],
  'Wellness': [
    'Spa',
    'Fitness Class',
    'Health Workshop',
    'Wellness Retreat',
    'Mental Health'
  ]
};

export class Eventmodel {
}
