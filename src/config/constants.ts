import { API_URL } from './api';

export const API_BASE_URL = API_URL;

export const BUDGET_OPTIONS = [
  { value: 'low', label: 'Budget Friendly' },
  { value: 'medium', label: 'Moderate' },
  { value: 'luxury', label: 'Luxury' },
];

export const TRANSPORTATION_OPTIONS = [
  { value: 'car', label: 'Car' },
  { value: 'train', label: 'Train' },
  { value: 'flight', label: 'Flight' },
  { value: 'mixed', label: 'Mixed' },
];

export const ACCOMMODATION_OPTIONS = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'luxury_hotel', label: 'Luxury Hotel' },
  { value: 'airbnb', label: 'Airbnb' },
];

export const PACE_OPTIONS = [
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'fast', label: 'Fast' },
];

export const INTEREST_OPTIONS = [
  { value: 'culture', label: 'Culture & History' },
  { value: 'nature', label: 'Nature & Outdoors' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'art', label: 'Art & Museums' },
];

export const DEFAULT_NUMBER_OF_TRAVELERS = 2;
export const MIN_TRIP_DURATION = 1;
export const MAX_TRIP_DURATION = 30; 