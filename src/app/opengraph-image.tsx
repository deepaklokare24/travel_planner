import { ImageResponse } from '@vercel/og';

// Route segment config
export const runtime = 'edge';
export const contentType = 'image/png';

// Image metadata
export const alt = 'AI Travel Planner';
export const size = {
  width: 1200,
  height: 630,
};

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
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '40px 60px',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            AI Travel Planner
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              marginTop: '0',
            }}
          >
            Your Perfect Journey Awaits
          </p>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Powered by AI • Personalized Itineraries • Local Insights
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 