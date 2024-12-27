import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGenerateItinerary } from '@/lib/hooks/useItinerary';
import type { TravelRequest, TravelPreferences } from '@/types';

interface FormData {
    fromLocation: string;
    toLocation: string;
    startDate: Date;
    endDate?: Date;
    budget: TravelPreferences['budget'];
    interests: string[];
    transportation: TravelPreferences['transportation'];
    accommodation_type: string;
    pace: TravelPreferences['pace'];
    numberOfTravelers: number;
    includeWeather: boolean;
    includeLocalTips: boolean;
}

const TripForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const generateItineraryMutation = useGenerateItinerary();

    const onSubmit = async (formData: FormData) => {
        try {
            const request: TravelRequest = {
                from_location: formData.fromLocation,
                to_location: formData.toLocation,
                start_date: formData.startDate.toISOString().split('T')[0],
                end_date: formData.endDate?.toISOString().split('T')[0],
                preferences: {
                    budget: formData.budget,
                    interests: formData.interests || [],
                    transportation: formData.transportation,
                    accommodation_type: formData.accommodation_type,
                    pace: formData.pace
                },
                number_of_travelers: formData.numberOfTravelers,
                include_weather: formData.includeWeather,
                include_local_tips: formData.includeLocalTips
            };

            const response = await generateItineraryMutation.mutateAsync(request);
            router.push(`/itinerary/${response.id}`);
        } catch (error) {
            console.error('Error generating itinerary:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Add your form fields here */}
        </form>
    );
};

export default TripForm;