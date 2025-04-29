// src/services/apiConfig.ts
export const API_BASE_URL: string = 'https://core-skill-test.webc.in/employee-portal/api/v1';

export const getAuthHeaders = (): { Authorization: string } => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No authentication token found');
    throw new Error('No authentication token found');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
};