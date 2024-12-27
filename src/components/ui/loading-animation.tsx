"use client"

import { useEffect, useState } from "react"
import { Plane, Car, Globe, Train, MapPin, Cloud, Compass, Hotel } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: 1,
    message: "Generating your perfect itinerary",
    icon: Globe,
    color: "text-blue-500"
  },
  {
    id: 2,
    message: "Finding the best transportation options",
    icon: Plane,
    color: "text-indigo-500"
  },
  {
    id: 3,
    message: "Checking local weather forecast",
    icon: Cloud,
    color: "text-sky-500"
  },
  {
    id: 4,
    message: "Discovering exciting attractions",
    icon: MapPin,
    color: "text-rose-500"
  },
  {
    id: 5,
    message: "Gathering insider local tips",
    icon: Compass,
    color: "text-emerald-500"
  }
]

export function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length
        if (next === 0) {
          setCompletedSteps([])
        } else {
          setCompletedSteps((prev) => [...prev, currentStep])
        }
        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [currentStep])

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 p-4">
        {/* Progress Steps */}
        <div className="w-full max-w-md space-y-4 bg-card p-6 rounded-xl shadow-lg border">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === index
            const isCompleted = completedSteps.includes(index)

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center gap-4 rounded-lg p-4 transition-all duration-500",
                  isActive && "bg-accent",
                  isCompleted && "opacity-50"
                )}
              >
                <div className="relative">
                  <Icon 
                    className={cn(
                      "h-6 w-6",
                      step.color,
                      isActive && "animate-bounce"
                    )} 
                  />
                  {isCompleted && (
                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500" />
                  )}
                </div>
                <span 
                  className={cn(
                    "text-sm font-medium",
                    isActive && "text-primary"
                  )}
                >
                  {step.message}
                  {isActive && (
                    <span className="ml-2 inline-block animate-pulse">...</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>

        {/* Moving Vehicles Animation */}
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

        {/* Status Text */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Creating Your Dream Trip</h3>
          <p className="text-sm text-muted-foreground">
            This might take a minute or two
          </p>
        </div>
      </div>
    </div>
  )
} 