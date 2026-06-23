// api/client.ts
import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = (): string => {
  // Check environment variable first
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl;
  }

  // For Expo development with physical device
  try {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      // hostUri format: "192.168.1.100:19000" or "localhost:19000"
      const host = hostUri.split(':')[0];
      return `http://${host}:3000/api`;
    }
  } catch (error) {
    console.log('Could not get hostUri:', error);
  }

  // For Android emulator
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api';
  }

  // For iOS simulator
  if (Platform.OS === 'ios') {
    return 'http://localhost:3000/api';
  }

  // Fallback
  return 'http://localhost:3000/api';
};

const baseURL = getApiUrl();
console.log('🔧 API URL:', baseURL);

export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default apiClient;