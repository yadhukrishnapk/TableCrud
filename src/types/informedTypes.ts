declare module 'informed' {
    export interface FormState {
      values: { [key: string]: any };
      errors?: { [key: string]: string };
      pristine: boolean;  
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
}