import React from "react";
import { Select, useFormState, FormState } from "informed";
import { Form, Alert, Spinner } from "react-bootstrap";
import ErrorMessage from "./ErrorMessage";

interface SelectOption {
  [key: string]: any;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options?: SelectOption[];
  isLoading?: boolean;
  loadingMessage?: string;
  error?: boolean | Error;
  errorMessage?: string;
  validate?: (value: any, values: { [key: string]: any }) => string | undefined;
  valueKey?: string;
  labelKey?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  label, 
  name, 
  options, 
  isLoading = false,
  loadingMessage = "Loading...",
  error,
  errorMessage = "Error loading data",
  validate,
  valueKey = "id",
  labelKey = "name"
}) => {
  const formState: FormState = useFormState();
  const fieldError = formState.errors?.[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-medium">{label}</Form.Label>
      {isLoading ? (
        <div className="d-flex align-items-center py-2">
          <Spinner animation="border" size="sm" variant="primary" />
          <span className="ms-2 text-muted">{loadingMessage}</span>
        </div>
      ) : error ? (
        <Alert variant="danger" className="py-1 px-2 mb-0">
          {errorMessage}
        </Alert>
      ) : (
        <>
          <Select
            name={name}
            className="form-select"
            validate={validate}
          >
            <option value="">Select {label}</option>
            {options && options.map(option => (
              <option key={option[valueKey]} value={option[valueKey]}>
                {option[labelKey]}
              </option>
            ))}
          </Select>
          <ErrorMessage name={name} />
        </>
      )}
    </Form.Group>
  );
};

export default SelectField;