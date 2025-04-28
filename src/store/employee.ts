// src/store/employee.ts
import { atom } from 'recoil';

interface Employee {
  id: string;
  name: string;
  [key: string]: unknown; // Flexible for additional fields
}

interface EmployeeState {
  data: Employee[];
  loading: boolean;
  error: string | null;
}

export const employeeState = atom<EmployeeState>({
  key: 'employeeState',
  default: {
    data: [],
    loading: false,
    error: null,
  },
});