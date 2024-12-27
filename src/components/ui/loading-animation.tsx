import { Plane, Car, Train, Globe, Hotel, MapPin } from "lucide-react";

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-xl shadow-lg border max-w-md w-full mx-4">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-progress" />
          </div>

          {/* Moving vehicles */}
          <div className="relative w-48 h-12 overflow-hidden">
            <div className="absolute inset-0 animate-fly">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute inset-0 animate-drive delay-1000">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute inset-0 animate-train delay-2000">
              <Train className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* Status text */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Globe className="h-5 w-5 animate-spin-slow text-primary" />
              <span className="text-lg font-medium">Crafting your perfect itinerary...</span>
              <MapPin className="h-5 w-5 animate-bounce text-primary" />
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Hotel className="h-4 w-4" />
              <span>Finding the best places for you</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 