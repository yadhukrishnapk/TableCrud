// src/services/apiEmployees.ts
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL, getAuthHeaders } from './apiConfig';
import { EmployeesResponse, EmployeeResponse } from '../types/employee';

interface EmployeeQueryParams {
  page: number;
  sortOrder?: string;
  sortBy?: string;
  pageSize?: number;
}

export const employeeService = {
  async getEmployees({
    page,
    sortOrder = 'asc',
    sortBy = 'name',
    pageSize = 10,
  }: EmployeeQueryParams): Promise<EmployeesResponse> {
    const response: AxiosResponse = await axios.get(
      `${API_BASE_URL}/employee`,
      {
        params: {
          page,
          length: pageSize,
          sort_order: sortOrder,
          sort_by: sortBy,
        },
        headers: getAuthHeaders(),
      },
    );
    
    console.log("main response: ", response.data);
    // Fix: Access the correct nested structure (rows) as in the JavaScript version
    return response.data?.data?.rows || { data: [], total: 0 };
  },
  
  async getEmployeeById(id: string): Promise<EmployeeResponse> {
    const response: AxiosResponse = await axios.get(
      `${API_BASE_URL}/employee/show`,
      {
        params: { id },
        headers: getAuthHeaders(),
      },
    );
    console.log("idresponse: ", response);
    
    return response.data?.data || { id, name: '' };
  },
};