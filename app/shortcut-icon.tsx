import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const size = { width: 96, height: 96 };

export default function Image() {
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
          fontSize: '48px',
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