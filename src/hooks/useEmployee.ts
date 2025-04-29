import useSWR from 'swr';
import { employeeService } from '../services/apiEmployees';
import { EmployeesResponse, EmployeeResponse } from '../types/employee';

interface EmployeeQueryParams {
  page: number;
  sortOrder: string;
  sortBy: string;
  pageSize?: number;
}

interface UseEmployeesResult {
  employees: EmployeeResponse[];
  totalEmployees: number;
  isLoading: boolean;
  isValidating: boolean;
  error: Error | null | undefined;
  mutate: () => void;
}

interface UseEmployeeDetailsResult {
  employee: EmployeeResponse | undefined;
  isLoading: boolean;
  error: Error | null | undefined;
  mutate: (data?: EmployeeResponse, shouldRevalidate?: boolean) => Promise<EmployeeResponse | undefined>;
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
    mutate: () => mutate(),
  };
};

export const useEmployeeDetails = (id: string): UseEmployeeDetailsResult => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? [`employee`, id] : null,
    () => employeeService.getEmployeeById(id),
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 5000,
    }
  );

  return {
    employee: data,
    isLoading,
    error,
    mutate,
  };
};