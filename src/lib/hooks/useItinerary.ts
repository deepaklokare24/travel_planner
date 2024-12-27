import { useMutation, useQuery } from '@tanstack/react-query';
import { generateItinerary, getItinerary, type GenerateItineraryRequest, type ItineraryResponse } from '@/lib/api/client';

export function useGenerateItinerary() {
  return useMutation<ItineraryResponse, Error, GenerateItineraryRequest>({
    mutationFn: generateItinerary,
  });
}

export function useItinerary(id: string) {
  return useQuery<ItineraryResponse, Error>({
    queryKey: ['itinerary', id],
    queryFn: () => getItinerary(id),
    enabled: !!id,
  });
}