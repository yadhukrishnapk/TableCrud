import React from "react";
import { RadioGroup, Radio } from "informed";
import { Form } from 'react-bootstrap';

interface RadioOption {
  value: string | number;
  label: string;
}

interface RadioFieldProps {
  label: string;
  name: string;
  options: RadioOption[];
  validate?: (value: any, values: { [key: string]: any }) => string | undefined;
}

const RadioField: React.FC<RadioFieldProps> = ({ label, name, options, validate }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <RadioGroup name={name} validate={validate}>
      <div className="d-flex gap-4">
        {options.map((option) => (
          <div key={option.value} className="form-check">
            <Radio
              name={name}
              value={option.value}
              className="form-check-input"
              id={`${name}-${option.value}`}
            />
            <label
              className="form-check-label"
              htmlFor={`${name}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </RadioGroup>
  </Form.Group>
);

export default RadioField;