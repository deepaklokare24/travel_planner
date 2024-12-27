import { ImageResponse } from 'next/server';
import React from 'react';
 
export const runtime = 'edge';
export const contentType = 'image/x-icon';
export const size = { width: 32, height: 32 };
 
export async function GET(): Promise<ImageResponse> {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #4F46E5, #0EA5E9)',
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '20px',
          fontWeight: 700,
        }}
      >
        T
      </div>
    ),
    {
      ...size,
    }
  );
} 