"use client";

import { ArrowRight, Globe2, MapPin, Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80")'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Perfect Journey Awaits
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            Let our AI travel expert craft your ideal itinerary, tailored to your preferences
          </p>
          <Link href="/plan">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Planning Your Trip <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Plan with Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <div className="mb-4">
              <Globe2 className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
            <p className="text-muted-foreground">
              Get personalized suggestions based on your interests, budget, and travel style
            </p>
          </Card>
          <Card className="p-6">
            <div className="mb-4">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Local Insights</h3>
            <p className="text-muted-foreground">
              Discover hidden gems and authentic experiences with local tips
            </p>
          </Card>
          <Card className="p-6">
            <div className="mb-4">
              <Plane className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Itineraries</h3>
            <p className="text-muted-foreground">
              Get detailed day-by-day plans optimized for your schedule
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Adventure?
          </h2>
          <Link href="/plan">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Plan Your Trip Now <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}