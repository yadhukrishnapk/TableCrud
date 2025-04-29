// src/hooks/useEmployees.ts
import useSWR from 'swr';
import { employeeService } from '../services/apiEmployees'; // Fix the import
import { EmployeesResponse, Employee } from '../types/employee'; // Ensure correct import paths

interface EmployeeQueryParams {
  page: number;
  sortOrder: string;
  sortBy: string;
  pageSize: number;
}

interface UseEmployeesResult {
  employees: Employee[];
  totalEmployees: number;
  isLoading: boolean;
  isValidating: boolean;
  error: Error | null | undefined;  // Allow undefined for error
  mutate: () => void;
}

export const useEmployees = (
    page: number,
    sortOrder: string,
    sortBy: string,
    pageSize: number = 10,
  ): UseEmployeesResult => {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
      [`employees`, { page, sortOrder, sortBy, pageSize }],
      () => employeeService.getEmployees({ page, sortOrder, sortBy, pageSize }),
      {
        keepPreviousData: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        errorRetryCount: 3,
        dedupingInterval: 5000,
      }
    );
  
    return {
      employees: data?.data || [],
      totalEmployees: data?.total || 0,
      isLoading,
      isValidating,
      error,
      mutate,
    };
  };

