import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../services/apiConfig';
import { showErrorToast } from '../utils/toastMessage';

interface MasterDataItem {
  id: string;
  name?: string;
  title?: string;
  [key: string]: any;
}

interface MasterDataResponse {
  success: boolean;
  data: MasterDataItem[];
  message?: string;
}

interface UseMasterDataResult {
  data: MasterDataItem[];
  loading: boolean;
  error: string | null;
}

export const useMasterData = (endpoint: string): UseMasterDataResult => {
  const [data, setData] = useState<MasterDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<MasterDataResponse>(`${API_BASE_URL}${endpoint}`, {
          headers: getAuthHeaders(),
        });
        
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch data');
          showErrorToast(response.data.message || 'Failed to fetch data');
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch data';
        setError(errorMessage);
        showErrorToast(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
  }, [endpoint]);

  return { data, loading, error };
};