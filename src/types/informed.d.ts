// src/types/informed.d.ts
declare module 'informed';

export interface FormState {
  values: { [key: string]: any };
  errors?: { [key: string]: string };
}

export interface FormProps {
  onSubmit?: (formState: FormState) => void;
  children: React.ReactNode;
  [key: string]: any;
}

export interface FieldProps {
  name: string;
  validate?: (value: string) => string | undefined;
  validateOn?: 'change' | 'blur' | 'submit';
  [key: string]: any;
}

export interface FieldState {
  value?: string;
  error?: string;
  touched?: boolean;
}

export interface FieldApi {
  setValue: (value: string) => void;
  setTouched: (touched: boolean) => void;
}

export const Form: React.ComponentType<FormProps>;
export function useField<T>(props: FieldProps): {
  fieldState: FieldState;
  fieldApi: FieldApi;
  render: (children: React.ReactNode) => React.ReactNode;
};