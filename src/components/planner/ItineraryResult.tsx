import { useState } from 'react';
import { format } from 'date-fns';
import { MapPinIcon, CalendarIcon, UserGroupIcon, CloudIcon } from '@heroicons/react/24/solid';
import { useItinerary } from '@/lib/hooks/useItinerary';

interface ItineraryResultProps {
    id: string;
}

export default function ItineraryResult({ id }: ItineraryResultProps) {
    const { data: itinerary, isLoading, error } = useItinerary(id);
    const [activeDay, setActiveDay] = useState<number>(1);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">Failed to load itinerary</div>
                <button
                    onClick={() => window.location.reload()}
                    className="text-indigo-600 hover:text-indigo-500"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!itinerary) {
        return null;
    }

    const startDate = new Date(itinerary.request_details.start_date);
    const endDate = itinerary.request_details.end_date 
        ? new Date(itinerary.request_details.end_date)
        : startDate;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 px-6 py-8 text-white">
                    <h1 className="text-3xl font-bold">Your Travel Itinerary</h1>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="flex items-center space-x-2">
                            <MapPinIcon className="h-5 w-5" />
                            <span>{itinerary.request_details.to_location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="h-5 w-5" />
                            <span>{format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <UserGroupIcon className="h-5 w-5" />
                            <span>{itinerary.metadata.number_of_travelers} Travelers</span>
                        </div>
                        {itinerary.metadata.includes_weather && (
                            <div className="flex items-center space-x-2">
                                <CloudIcon className="h-5 w-5" />
                                <span>Weather Info Included</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Days Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="flex overflow-x-auto py-4 px-6">
                        {Array.from({ length: days }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveDay(index + 1)}
                                className={`
                                    px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap
                                    ${activeDay === index + 1
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }
                                    ${index > 0 ? 'ml-4' : ''}
                                `}
                            >
                                Day {index + 1}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Itinerary Content */}
                <div className="px-6 py-8">
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: itinerary.itinerary }} />
                    </div>

                    {/* Weather Information */}
                    {itinerary.weather_info && (
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Weather Information</h3>
                            <div className="text-blue-800">
                                {itinerary.weather_info}
                            </div>
                        </div>
                    )}

                    {/* Local Tips */}
                    {itinerary.local_tips && (
                        <div className="mt-8 p-4 bg-green-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-900 mb-2">Local Tips</h3>
                            <div className="text-green-800">
                                {itinerary.local_tips}
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Download PDF
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const url = window.location.href;
                                navigator.clipboard.writeText(url);
                            }}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Share Itinerary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}