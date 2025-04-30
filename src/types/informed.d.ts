// src/types/informed.d.ts
declare module 'informed' {
  export interface FormState {
    values: { [key: string]: any };
    errors?: { [key: string]: string };
    pristine: boolean;  // Added pristine field
    touched?: boolean;
    dirty?: boolean;
    invalid?: boolean;
    valid?: boolean;
  }
  
  export interface FormApi {
    setValue: (name: string, value: any) => void;
    setValues: (values: { [key: string]: any }) => void;
    reset: () => void;
    submitForm: () => void;
  }
  
  export interface FormProps {
    onSubmit?: (formState: FormState) => void;
    initialValues?: { [key: string]: any };
    children: React.ReactNode | ((api: { formState: FormState, formApi: FormApi }) => React.ReactNode);
    [key: string]: any;
  }
  
  export interface FieldProps {
    name: string;
    validate?: (value: any, values: { [key: string]: any }) => string | undefined;
    validateOn?: 'change' | 'blur' | 'submit';
    formatter?: string | ((value: any) => any);
    parser?: (value: any) => any;
    [key: string]: any;
  }
  
  export interface FieldState {
    value?: any;
    error?: string;
    touched?: boolean;
    pristine?: boolean;
    dirty?: boolean;
  }
  
  export interface FieldApi {
    setValue: (value: any) => void;
    setTouched: (touched: boolean) => void;
    reset: () => void;
  }
  
  export interface SelectOption {
    value: string | number;
    label?: string;
    [key: string]: any;
  }
  
  export const Form: React.ComponentType<FormProps>;
  
  export function useForm(): { formState: FormState; formApi: FormApi };
  
  export function useField<T = any>(props: FieldProps): {
    fieldState: FieldState;
    fieldApi: FieldApi;
    render: (children: React.ReactNode) => React.ReactNode;
  };
 // Add RadioGroup and Radio component types
 export interface RadioGroupProps extends FieldProps {
  children: React.ReactNode;
}

export interface RadioProps extends FieldProps {
  value: string | number;
  className?: string;
  id?: string;
}

export const Form: React.ComponentType<FormProps>;
export const RadioGroup: React.FC<RadioGroupProps>;
export const Radio: React.FC<RadioProps>;

export function useForm(): { formState: FormState; formApi: FormApi };

export function useField<T = any>(props: FieldProps): {
  fieldState: FieldState;
  fieldApi: FieldApi;
  render: (children: React.ReactNode) => React.ReactNode;
};
}