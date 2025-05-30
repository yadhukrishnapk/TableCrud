import React from "react";
import { useFormState } from "informed";

interface ErrorMessageProps {
  name: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ name }) => {
  let formState;
 
  try {
    formState = useFormState();
  } catch (e) {
    return null;
  }

  const error = formState?.errors?.[name];

  if (error) {
    const element = document.querySelector<HTMLInputElement>(`[name="${name}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return (
      <div className="text-danger mt-1 small">
        <i className="bi bi-exclamation-circle me-1"></i>
        {error}
      </div>
    );
  }

  return null;
};

export default ErrorMessage;
