# Travel Planner - AI-Powered Travel Itinerary Generator

A modern, user-friendly travel planning application built with Next.js that helps users create detailed travel itineraries powered by AI. The application provides comprehensive travel plans including daily activities, transportation options, accommodation suggestions, restaurant recommendations, and local tips.

![Travel Planner Screenshot]

## Features

### 🎯 Key Features
- **Smart Itinerary Generation**: AI-powered travel planning based on your preferences
- **Interactive Form**: Easy-to-use interface for inputting travel preferences
- **Comprehensive Results**: 
  - Detailed day-by-day itinerary
  - Transportation options with booking links
  - Hotel recommendations
  - Restaurant suggestions
  - Local attractions
  - Weather information
  - Local tips and customs
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Print-Ready Itineraries**: Easy to print or save your travel plans

### 💡 Smart Preferences
- Budget level (Budget-friendly, Moderate, Luxury)
- Transportation preferences (Car, Train, Flight, Mixed)
- Accommodation type (Hotel, Hostel, Luxury Hotel, Airbnb)
- Travel pace (Relaxed, Moderate, Fast)
- Number of travelers
- Weather information inclusion
- Local tips and customs inclusion

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Query
- **Icons**: Lucide Icons
- **Date Handling**: date-fns
- **API Integration**: Axios

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Access to required API keys

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd travel_planner
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### Planning a Trip
1. Navigate to the Plan page
2. Fill in your travel details:
   - From and To locations
   - Start and End dates
   - Budget preference
   - Transportation preference
   - Accommodation type
   - Travel pace
   - Number of travelers
3. Click "Generate Itinerary"

### Viewing Your Itinerary
The result page displays your travel plan in several sections:

1. **Overview**
   - Trip summary
   - Weather information
   - Key details

2. **Daily Plan**
   - Detailed day-by-day itinerary
   - Activities and timings
   - Location-specific recommendations

3. **Transportation**
   - Available transport options
   - Booking links
   - Price estimates

4. **Hotels**
   - Accommodation recommendations
   - Amenities
   - Location details
   - Booking links

5. **Restaurants**
   - Dining recommendations
   - Cuisine types
   - Price ranges
   - Ratings

6. **Attractions**
   - Points of interest
   - Activity descriptions
   - Visit information

7. **Local Tips**
   - Cultural insights
   - Travel advice
   - Local customs

### Additional Features
- Print your itinerary
- Plan another trip
- Navigate between different sections
- Access booking links directly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework 