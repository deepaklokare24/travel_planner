import axios from 'axios';
import { API_BASE_URL } from '@/config/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GenerateItineraryRequest {
  from_location: string;
  to_location: string;
  start_date: string;
  end_date: string;
  preferences: {
    budget: string;
    interests: string[];
    transportation: string;
    accommodation_type: string;
    pace: string;
  };
  number_of_travelers: number;
  include_weather: boolean;
  include_local_tips: boolean;
}

export interface ItineraryResponse {
  id: string;
  itinerary: {
    days: Array<{
      date: string;
      activities: Array<{
        time: string;
        description: string;
        location?: string;
        duration?: string;
        cost?: string;
      }>;
    }>;
    weather?: {
      temperature: string;
      conditions: string;
    };
    local_tips?: string[];
  };
}

export const generateItinerary = async (data: GenerateItineraryRequest): Promise<ItineraryResponse> => {
  const response = await apiClient.post<ItineraryResponse>('/generate-itinerary', data);
  return response.data;
};

export const getItinerary = async (id: string): Promise<ItineraryResponse> => {
  const response = await apiClient.get<ItineraryResponse>(`/itinerary/${id}`);
  return response.data;
};

export default apiClient;