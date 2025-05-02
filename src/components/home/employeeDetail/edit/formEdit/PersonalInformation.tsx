import React from "react";
import { Row, Col } from "react-bootstrap";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  validate?: (value: string) => string | null;
  placeholder?: string;
  max?: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  validate?: (value: string) => string | null;
  valueKey: string;
  labelKey: string;
}

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

interface GenderOption {
  value: string;
  label: string;
}

type Validator = (value: string) => string | null;

interface PersonalInformationProps {
  today: string; 
  requiredField: (fieldName: string) => Validator;
  validatePhone: Validator;
  validateJoiningDate: Validator;
}

// Mock component types (assuming these are defined elsewhere)
const FormField: React.FC<FormFieldProps> = () => null;
const SelectField: React.FC<SelectFieldProps> = () => null;
const FormSection: React.FC<FormSectionProps> = () => null;

// Mock genderOptions (assuming this is defined in genderMapping)
const genderOptions: GenderOption[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  today,
  requiredField,
  validatePhone,
  validateJoiningDate,
}) => (
  <FormSection title="Personal Information" icon={<i className="bi bi-person-vcard"></i>}>
    <Row>
      <Col md={6}>
        <FormField
          label="Name"
          name="name"
          validate={requiredField("Name")}
          placeholder="Full Name"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          validate={requiredField("Email")}
          placeholder="employee@company.com"
        />
        <FormField
          label="Phone"
          name="phone"
          validate={validatePhone}
          placeholder="+91 XXXXXXXXXX"
        />
        <SelectField
          label="Gender"
          name="gender"
          options={genderOptions}
          validate={requiredField("Gender")}
          valueKey="value"
          labelKey="label"
        />
      </Col>
      <Col md={6}>
        <FormField
          label="Date of Birth"
          name="date_of_birth"
          type="date"
          validate={requiredField("Date of Birth")}
        />
        <FormField
          label="Employee Code"
          name="employee_code"
          validate={requiredField("Employee Code")}
          placeholder="EMP-XXXX"
        />
        <FormField
          label="Salary"
          name="salary"
          type="number"
          validate={requiredField("Salary")}
          placeholder="0.00"
        />
        <FormField
          label="Joining Date"
          name="joining_date"
          type="date"
          validate={validateJoiningDate}
          max={today}
        />
      </Col>
    </Row>
  </FormSection>
);

export default PersonalInformation;