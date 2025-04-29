// src/types/employee.ts
export interface Employee {
  id: string;
  employee_code: string;
  name: string;
  email: string;
  phone: string;
  designation: {
    title: string;
    [key: string]: unknown;
  };
  [key: string]: unknown; // Flexible for additional fields
}

export interface EmployeesResponse {
  data: Employee[];
  total: number;
}

export interface EmployeeResponse {
  id: string;
  employee_code?: string;
  name: string;
  email?: string;
  phone?: string;
  designation?: {
    title: string;
    [key: string]: unknown;
  };
  [key: string]: unknown; // Flexible for additional fields
}

// This interface represents the actual API response structure
export interface RawEmployeesApiResponse {
  current_page: number;
  data: {
    rows: {
      data: Employee[];
      total: number;
    }
  };
  total: number;
}