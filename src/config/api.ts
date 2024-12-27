const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://travelagent-production.up.railway.app';
  }
  return 'http://localhost:8000';
};

export const API_URL = getApiUrl(); 