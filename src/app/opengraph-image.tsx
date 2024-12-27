import { ImageResponse } from 'next/server';
import React from 'react';

// Route segment config
export const runtime = 'edge';
export const alt = 'Travel Planner';

// Image metadata
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #4F46E5, #0EA5E9)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '80px',
            fontWeight: 700,
            marginBottom: '20px',
          }}
        >
          Travel Planner
        </div>
        <div
          style={{
            fontSize: '40px',
            opacity: 0.8,
          }}
        >
          Plan your perfect trip with AI
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 