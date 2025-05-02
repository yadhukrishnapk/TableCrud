// src/components/login/InputField.tsx
import { useState } from 'react';
import { useField } from 'informed';
import { InputGroup } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { FieldProps,FieldState } from 'informed';

interface InputFieldProps extends Omit<FieldProps, 'name'> {
  name: string; // ✅ Explicitly define it
  label?: string;
  fieldType?: 'text' | 'password';
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

  const InputField = ({
    label,
    name,
    fieldType = 'text',
    validate,
    validateOn,
    required = false,
    placeholder,
    icon,
    disabled = false,
    ...props
  }: InputFieldProps) => {
    const wrappedValidate = validate
      ? (value: unknown) => validate(value as string)
      : undefined;
  
    const { fieldState, fieldApi, render } = useField({
      name,
      validate: wrappedValidate, // ✅ use wrapped version
      validateOn,
      ...props,
    });
  
    const { error, value } = fieldState as FieldState;
    const inputId = `${name}-input`;
    const errorId = `${name}-error`;
    const [showPassword, setShowPassword] = useState<boolean>(false);
  
    const actualFieldType =
      fieldType === 'password' ? (showPassword ? 'text' : 'password') : fieldType;
  
    return render(
      <div className="mb-3">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}
        <InputGroup hasValidation>
          {icon && <InputGroup.Text className="input-icon">{icon}</InputGroup.Text>}
          <input
            id={inputId}
            name={name}
            type={actualFieldType}
            value={value || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              fieldApi.setValue(e.target.value)
            }
            onBlur={() => fieldApi.setTouched(true)}
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder={placeholder || `Enter ${label?.toLowerCase()}`}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            disabled={disabled}
          />
          {fieldType === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-outline-secondary"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
          {error && (
            <div id={errorId} className="invalid-feedback">
              {error}
            </div>
          )}
        </InputGroup>
      </div>,
    );
  };
  
  export default InputField;