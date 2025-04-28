export interface User {
    id?: string;
    username?: string;
    [key: string]: unknown; // Flexible for additional fields
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
  }
  
  export interface LoginResponse {
    success: boolean;
    message?: string;
    data?: {
      token: string;
      username?: string;
      [key: string]: unknown;
    };
  }
  export interface LoginFormValues {
    username: string;
    password: string;
  }
  
  export interface LoginErrors {
    username?: string;
    password?: string;
    general?: string;
  }
  