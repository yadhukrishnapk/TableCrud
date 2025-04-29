export interface GenderOption {
    value: string;
    label: string;
  }
  
  export const genderOptions: GenderOption[] = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Other" },
  ];
  
  export const getGenderLabel = (value: string | undefined): string => {
    if (!value) return "Unknown";
    const gender = genderOptions.find((g) => g.value === String(value));
    return gender ? gender.label : "Unknown";
  };