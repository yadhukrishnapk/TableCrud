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
  [key: string]: unknown;
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
  profile_picture?: string;
  gender?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  department?: {
    name: string;
    [key: string]: unknown;
  };
  employment_type?: {
    title: string;
    [key: string]: unknown;
  };
  joining_date?: string;
  salary?: number;
  bank_account_number?: string;
  ifsc_code?: string;
  emergency_contact?: string;
  created_by?: {
    name: string;
    [key: string]: unknown;
  };
  formatted_created_at?: string;
  updated_by?: {
    name: string;
    [key: string]: unknown;
  };
  formatted_updated_at?: string;
  [key: string]: unknown;
}

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