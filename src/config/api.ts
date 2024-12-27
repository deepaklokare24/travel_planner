const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://travelagent-production.up.railway.app/api/v1';
  }
  return 'http://localhost:8000/api/v1';
};

export const API_URL = getApiUrl(); 