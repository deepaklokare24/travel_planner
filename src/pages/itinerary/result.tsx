import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon, MapPinIcon, UtensilsIcon, BedIcon, CloudIcon, CompassIcon, InfoIcon, ArrowRight, ThermometerIcon, DropletIcon, SunIcon, CloudRainIcon, CloudSnowIcon, CloudLightningIcon, CloudFogIcon, CloudSunIcon, MoonIcon, HomeIcon } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

interface Transportation {
  type: string;
  title: string;
  description: string;
  link: string;
}

interface Restaurant {
  name: string;
  description: string;
  url: string;
  rating: number;
  cuisine: string;
  price_level: string;
}

interface Hotel {
  name: string;
  description: string;
  url: string;
  rating: number;
  location: string;
  amenities: string[];
}

interface LocalTip {
  title: string;
  description: string;
  url: string;
  category: string;
}

interface WeatherInfo {
  temperature: number;
  feels_like: number;
  status: string;
  humidity: number;
}

interface ItineraryData {
  itinerary: string;
  from_location: string;
  to_location: string;
  start_date: string;
  end_date: string;
  generated_at: string;
  metadata: {
    includes_weather: boolean;
    includes_local_tips: boolean;
    number_of_travelers: number;
  };
  transportation_info: Transportation[];
  weather_info: WeatherInfo;
  attractions: any[];
  restaurants: Restaurant[];
  hotels: Hotel[];
  local_tips: LocalTip[];
  request_details: {
    preferences: {
      budget: string;
      interests: string[];
      transportation: string;
      accommodation_type: string;
      pace: string;
    }
  }
}

interface DayTitle {
  dayNumber: string;
  date: string;
  dayTitle: string;
  fullTitle: string;
}

interface Day {
  title: DayTitle;
  content: string[];
}

export default function ItineraryResultPage() {
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedItinerary = localStorage.getItem('currentItinerary');
    if (storedItinerary) {
      try {
        const parsedItinerary = JSON.parse(storedItinerary);
        setItinerary(parsedItinerary);
      } catch (error) {
        console.error('Error parsing itinerary:', error);
        router.push('/plan');
      }
    } else {
      router.push('/plan');
    }
  }, [router]);

  const getWeatherIcon = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('clear')) return <SunIcon className="h-5 w-5 text-yellow-500" />;
    if (statusLower.includes('rain')) return <CloudRainIcon className="h-5 w-5 text-blue-500" />;
    if (statusLower.includes('snow')) return <CloudSnowIcon className="h-5 w-5 text-blue-200" />;
    if (statusLower.includes('thunder')) return <CloudLightningIcon className="h-5 w-5 text-yellow-400" />;
    if (statusLower.includes('fog') || statusLower.includes('mist')) return <CloudFogIcon className="h-5 w-5 text-gray-400" />;
    if (statusLower.includes('cloud') && statusLower.includes('sun')) return <CloudSunIcon className="h-5 w-5 text-yellow-400" />;
    if (statusLower.includes('cloud')) return <CloudIcon className="h-5 w-5 text-gray-400" />;
    if (statusLower.includes('night') || statusLower.includes('evening')) return <MoonIcon className="h-5 w-5 text-blue-900" />;
    return <SunIcon className="h-5 w-5 text-yellow-500" />;
  };

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const paragraphs = itinerary.itinerary.split('\n').filter(p => p.trim());
  const days: Day[] = paragraphs.reduce((acc: Day[], paragraph: string) => {
    if (paragraph.startsWith('**Day')) {
      const dayNumber = paragraph.match(/Day (\d+)/)?.[1] || '';
      
      // Try to match both date formats
      const longFormatMatch = paragraph.match(/(\w+), (\w+ \d+, \d{4})/);
      const shortFormatMatch = paragraph.match(/(\d{4}-\d{2}-\d{2}), (\w+)/);
      
      let formattedDate = '';
      if (longFormatMatch) {
        formattedDate = `${longFormatMatch[1]}, ${longFormatMatch[2]}`;
      } else if (shortFormatMatch) {
        const [year, month, day] = shortFormatMatch[1].split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        formattedDate = format(date, 'EEEE, MMMM d, yyyy');
      }

      // Extract day title if it exists (after the dash)
      const titleMatch = paragraph.match(/- ([^*]+)\*\*/);
      const dayTitle = titleMatch ? titleMatch[1].trim() : '';
      
      const formattedTitle: DayTitle = {
        dayNumber,
        date: formattedDate,
        dayTitle,
        fullTitle: `Day ${dayNumber}: ${formattedDate}${dayTitle ? ` - ${dayTitle}` : ''}`
      };
      
      acc.push({ title: formattedTitle, content: [] });
    } else if (acc.length > 0) {
      acc[acc.length - 1].content.push(paragraph);
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="absolute top-4 left-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <HomeIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Itinerary: {itinerary.from_location} to {itinerary.to_location}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5" />
                Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">From:</span>
                <span>{format(new Date(itinerary.start_date), 'EEEE, MMMM d, yyyy')}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">To:</span>
                <span>{format(new Date(itinerary.end_date), 'EEEE, MMMM d, yyyy')}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Travelers:</span>
                <span>{itinerary.metadata.number_of_travelers}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Budget:</span>
                <span className="capitalize">{itinerary.request_details.preferences.budget}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Pace:</span>
                <span className="capitalize">{itinerary.request_details.preferences.pace}</span>
              </p>
            </CardContent>
          </Card>

          {itinerary.weather_info && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getWeatherIcon(itinerary.weather_info.status)}
                  Current Weather
                </CardTitle>
                <CardDescription className="capitalize">
                  {itinerary.weather_info.status}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                    <ThermometerIcon className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">{itinerary.weather_info.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                    <ThermometerIcon className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Feels Like</p>
                      <p className="font-medium">{itinerary.weather_info.feels_like}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 col-span-2">
                    <DropletIcon className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-medium">{itinerary.weather_info.humidity}%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Tabs defaultValue="itinerary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
            <TabsTrigger value="itinerary">Daily Plan</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="tips">Local Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary">
            <Card>
              <CardHeader>
                <CardTitle>Daily Itinerary</CardTitle>
                <CardDescription>
                  Your day-by-day travel plan from {itinerary.from_location} to {itinerary.to_location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {days.map((day, index) => (
                    <AccordionItem key={index} value={`day-${index + 1}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-primary">Day {day.title.dayNumber}</span>
                            <span className="text-muted-foreground">•</span>
                            <span>{day.title.date}</span>
                          </div>
                          {day.title.dayTitle && (
                            <span className="text-sm text-muted-foreground pl-4">
                              {day.title.dayTitle}
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {day.content.map((content: string, i: number) => (
                          <p key={i} className="text-foreground leading-relaxed">
                            {content}
                          </p>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transportation">
            <Card>
              <CardHeader>
                <CardTitle>Transportation Options</CardTitle>
                <CardDescription>
                  Available transportation options from {itinerary.from_location} to {itinerary.to_location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {itinerary.transportation_info.map((transport, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">{transport.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {transport.description}
                          </p>
                        </div>
                        <a
                          href={transport.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0"
                        >
                          <Button variant="outline">
                            Book Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hotels">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.hotels.map((hotel, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{hotel.name}</span>
                      <span className="flex items-center text-sm">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        {hotel.rating}
                      </span>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{hotel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        {hotel.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity, i) => (
                          <span key={i} className="text-xs bg-secondary px-2 py-1 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <a
                        href={hotel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm block mt-2"
                      >
                        View Details →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restaurants">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.restaurants.map((restaurant, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{restaurant.name}</span>
                      <span className="flex items-center text-sm">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        {restaurant.rating}
                      </span>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {restaurant.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <UtensilsIcon className="h-4 w-4" />
                          {restaurant.cuisine}
                        </span>
                        <span>{restaurant.price_level}</span>
                      </div>
                      <a
                        href={restaurant.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm block mt-2"
                      >
                        View Details →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attractions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.attractions.map((attraction, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{attraction.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {attraction.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={attraction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm block mt-2"
                    >
                      Learn More →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {itinerary.local_tips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {tip.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{tip.description}</p>
                    <a
                      href={tip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      Read More →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => router.push('/plan')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Plan Another Trip
          </button>
          <button
            onClick={() => window.print()}
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors"
          >
            Print Itinerary
          </button>
        </div>
      </div>
    </div>
  );
} 