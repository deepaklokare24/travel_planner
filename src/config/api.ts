const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    // Replace this with your deployed API URL
    return 'https://your-api-url.railway.app';
  }
  return 'http://localhost:8000';
};

export const API_URL = getApiUrl(); 