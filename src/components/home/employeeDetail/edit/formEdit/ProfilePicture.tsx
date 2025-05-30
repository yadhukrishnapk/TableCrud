import React, { useState } from "react";
import { Form, Image } from "react-bootstrap";

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

type ShowErrorToast = (message: string) => void;

interface ProfilePictureProps {
  currentImage?: string; 
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSection: React.FC<FormSectionProps> = () => null;
const showErrorToast: ShowErrorToast = () => {};

const MAX_FILE_SIZE = 5 * 1024 * 1024; 

const ProfilePicture: React.FC<ProfilePictureProps> = ({ currentImage, onFileChange }) => {
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File size should not exceed 5MB.");
        showErrorToast("File size should not exceed 5MB.");
        return;
      }

      setError("");
      onFileChange(event);
    }
  };

  return (
    <FormSection title="Profile Picture" icon={<i className="bi bi-person-circle"></i>}>
      {currentImage && (
        <div className="mb-3 text-center">
          <Image
            src={currentImage}
            alt="Profile"
            style={{ width: "128px", height: "128px", objectFit: "cover" }}
            className="rounded-circle border shadow-sm"
          />
          <p className="text-muted mt-2 small">Current Profile Picture</p>
        </div>
      )}
      <Form.Group>
        <Form.Label>Update Profile Picture:</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          size="sm"
          className="form-control-sm"
        />
        {error && <p className="text-danger small mt-1">{error}</p>}
      </Form.Group>
    </FormSection>
  );
};

export default ProfilePicture;
