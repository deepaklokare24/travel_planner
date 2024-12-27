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
import { CalendarIcon, MinusCircle, PlusCircle, Users, HomeIcon } from "lucide-react";
import { useRouter } from "next/router";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import Link from "next/link";
import { API_BASE_URL } from '@/config/constants';

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

export default function PlanPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
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
      console.log("API Response:", data);
      
      if (data && data.itinerary) {
        // Store all the rich content from the API response
        localStorage.setItem('currentItinerary', JSON.stringify({
          itinerary: data.itinerary,
          from_location: data.from_location,
          to_location: data.to_location,
          start_date: data.start_date,
          end_date: data.end_date,
          generated_at: data.generated_at,
          metadata: data.metadata,
          transportation_info: data.transportation_info,
          weather_info: data.weather_info,
          attractions: data.attractions,
          restaurants: data.restaurants,
          hotels: data.hotels,
          local_tips: data.local_tips,
          request_details: data.request_details
        }));
        router.push(`/itinerary/result`);
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
      // You might want to show an error message to the user here
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
    <div className="min-h-screen bg-background py-8 px-4 md:py-12">
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
    </div>
  );
} 