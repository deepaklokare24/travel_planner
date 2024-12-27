import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = {
  width: 32,
  height: 32,
};

export default function Icon() {
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
          fontSize: '24px',
          color: 'white',
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