"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, MinusCircle, PlusCircle, Users, HomeIcon, MapPin, Star, DollarSign, Utensils, Bus, Hotel } from "lucide-react";
import { useRouter } from "next/router";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import Link from "next/link";
import { API_BASE_URL } from '@/config/constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const formSchema = z.object({
  from_location: z.string().min(2, "Location is required"),
  to_location: z.string().min(2, "Location is required"),
  start_date: z.date(),
  end_date: z.date(),
  budget: z.enum(["low", "medium", "luxury"]),
  interests: z.array(z.string()).default([]),
  transportation: z.enum(["car", "train", "flight", "mixed"]),
  accommodation_type: z.enum(["hotel", "hostel", "luxury_hotel", "airbnb"]),
  pace: z.enum(["relaxed", "moderate", "fast"]),
  number_of_travelers: z.number().min(1),
  include_weather: z.boolean(),
  include_local_tips: z.boolean(),
});

type ChipOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type TransportationOption = {
  type: string;
  title: string;
  description: string;
  steps: string[];
};

type Restaurant = {
  name: string;
  description: string;
  url: string;
  rating: number;
  cuisine: string;
  price_level: string;
};

type Hotel = {
  name: string;
  description: string;
  url: string;
  rating: number;
  location: string;
  amenities: string[];
};

type ApiResponse = {
  itinerary: string;
  from_location: string;
  to_location: string;
  transportation_info: TransportationOption[];
  restaurants: Restaurant[];
  hotels: Hotel[];
  // ... other fields
};

export default function PlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from_location: "",
      to_location: "",
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
      budget: "medium",
      interests: [],
      transportation: "mixed",
      accommodation_type: "hotel",
      pace: "moderate",
      number_of_travelers: 2,
      include_weather: true,
      include_local_tips: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-itinerary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_location: values.from_location,
          to_location: values.to_location,
          start_date: format(values.start_date, "yyyy-MM-dd"),
          end_date: format(values.end_date, "yyyy-MM-dd"),
          preferences: {
            budget: values.budget,
            interests: values.interests,
            transportation: values.transportation,
            accommodation_type: values.accommodation_type,
            pace: values.pace,
          },
          number_of_travelers: values.number_of_travelers,
          include_weather: values.include_weather,
          include_local_tips: values.include_local_tips,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate itinerary");
      }

      const data = await response.json();
      
      // Store the response in localStorage
      localStorage.setItem('currentItinerary', JSON.stringify(data));
      
      // Redirect to the result page
      router.push('/itinerary/result');
      
    } catch (error) {
      console.error("Error:", error);
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  const formatDate = (date: Date | undefined) => {
    if (!mounted || !date) return "";
    try {
      return format(date, "PPP");
    } catch {
      return "";
    }
  };

  const budgetOptions: ChipOption[] = [
    { value: "low", label: "Budget Friendly", icon: "💰" },
    { value: "medium", label: "Moderate", icon: "💰💰" },
    { value: "luxury", label: "Luxury", icon: "💰💰💰" },
  ];

  const transportationOptions: ChipOption[] = [
    { value: "car", label: "Car", icon: "🚗" },
    { value: "train", label: "Train", icon: "🚂" },
    { value: "flight", label: "Flight", icon: "✈️" },
    { value: "mixed", label: "Mixed", icon: "🚗✈️" },
  ];

  const accommodationOptions: ChipOption[] = [
    { value: "hotel", label: "Hotel", icon: "🏨" },
    { value: "hostel", label: "Hostel", icon: "🛏️" },
    { value: "luxury_hotel", label: "Luxury Hotel", icon: "🏰" },
    { value: "airbnb", label: "Airbnb", icon: "🏠" },
  ];

  const paceOptions: ChipOption[] = [
    { value: "relaxed", label: "Relaxed", icon: "🌴" },
    { value: "moderate", label: "Moderate", icon: "⚡" },
    { value: "fast", label: "Fast", icon: "🏃" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <HomeIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="max-w-3xl mx-auto pt-12 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Plan Your Trip</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="from_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter departure city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter destination city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {formatDate(field.value) || <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {formatDate(field.value) || <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < form.getValues("start_date")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Budget</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {budgetOptions.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "relative flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer border hover:border-primary/50 transition-all",
                          field.value === option.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-muted bg-card"
                        )}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className="sr-only"
                        />
                        <span className="text-xl">{option.icon}</span>
                        <span className="text-xs font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transportation"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Transportation</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {transportationOptions.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "relative flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer border hover:border-primary/50 transition-all",
                          field.value === option.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-muted bg-card"
                        )}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className="sr-only"
                        />
                        <span className="text-xl">{option.icon}</span>
                        <span className="text-xs font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accommodation_type"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Accommodation Type</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {accommodationOptions.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "relative flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer border hover:border-primary/50 transition-all",
                          field.value === option.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-muted bg-card"
                        )}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className="sr-only"
                        />
                        <span className="text-xl">{option.icon}</span>
                        <span className="text-xs font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pace"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Travel Pace</FormLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {paceOptions.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          "relative flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer border hover:border-primary/50 transition-all",
                          field.value === option.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-muted bg-card"
                        )}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={() => field.onChange(option.value)}
                          className="sr-only"
                        />
                        <span className="text-xl">{option.icon}</span>
                        <span className="text-xs font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number_of_travelers"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Number of Travelers</FormLabel>
                  <div className="flex items-center justify-center gap-4 p-3 rounded-lg border bg-card">
                    <button
                      type="button"
                      onClick={() => field.onChange(Math.max(1, field.value - 1))}
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
                        field.value <= 1
                          ? "text-muted-foreground bg-muted cursor-not-allowed"
                          : "text-primary hover:bg-primary/10"
                      )}
                      disabled={field.value <= 1}
                    >
                      <MinusCircle className="h-5 w-5" />
                    </button>
                    <div className="flex flex-col items-center gap-0.5 min-w-[100px]">
                      <Users className="h-6 w-6 text-primary" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-semibold">{field.value}</span>
                        {/* <span className="text-xs text-muted-foreground">
                          {field.value === 1 ? "Traveler" : "Travelers"}
                        </span> */}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => field.onChange(field.value + 1)}
                      className="h-8 w-8 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              Generate Itinerary
            </Button>
          </form>
        </Form>
      </div>
      {isLoading && <LoadingAnimation />}
      
      {response && (
        <div className="mt-8">
          <Tabs defaultValue="itinerary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="transportation">Transportation</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="hotels">Hotels</TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary">
              <Card>
                <CardHeader>
                  <CardTitle>Your Itinerary</CardTitle>
                  <CardDescription>
                    From {response.from_location} to {response.to_location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {response.itinerary.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transportation">
              <div className="grid gap-4">
                {response.transportation_info.map((option, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bus className="h-5 w-5" />
                        Option {index + 1}
                      </CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2">
                        {option.steps.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="restaurants">
              <div className="grid gap-4 md:grid-cols-2">
                {response.restaurants.map((restaurant, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        {restaurant.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {restaurant.rating}
                        </span>
                        <span>{restaurant.cuisine}</span>
                        <span>{restaurant.price_level}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{restaurant.description}</p>
                      {restaurant.url && (
                        <a
                          href={restaurant.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline mt-2 inline-block"
                        >
                          Visit Website
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hotels">
              <div className="grid gap-4 md:grid-cols-2">
                {response.hotels.map((hotel, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Hotel className="h-5 w-5" />
                        {hotel.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {hotel.rating}
                        </span>
                        <span>{hotel.location}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{hotel.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity, amenityIndex) => (
                          <span
                            key={amenityIndex}
                            className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      {hotel.url && (
                        <a
                          href={hotel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline mt-2 inline-block"
                        >
                          Visit Website
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 