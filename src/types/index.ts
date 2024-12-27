export interface TravelPreferences {
    budget: 'budget' | 'medium' | 'luxury';
    interests: string[];
    transportation: 'car' | 'public' | 'private' | 'train' | 'plane' | 'mixed';
    accommodation_type?: string;
    pace?: 'relaxed' | 'moderate' | 'intense';
}

export interface TravelRequest {
    from_location: string;
    to_location: string;
    start_date: string;
    end_date?: string;
    preferences: TravelPreferences;
    number_of_travelers: number;
    include_weather: boolean;
    include_local_tips: boolean;
}

export interface ItineraryMetadata {
    number_of_travelers: number;
    includes_weather: boolean;
    includes_local_tips: boolean;
}

export interface ItineraryResponse {
    id: string;
    request_details: TravelRequest;
    metadata: ItineraryMetadata;
    itinerary: string;
    weather_info?: string;
    local_tips?: string;
    created_at: string;
}