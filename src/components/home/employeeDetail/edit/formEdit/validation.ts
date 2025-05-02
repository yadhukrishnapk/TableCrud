export const requiredField = (field: string) => (value: any): string | undefined =>
    !value ? `${field} is required` : undefined;
  
  export const validateJoiningDate = (value: string | undefined): string | undefined => {
    if (!value) return 'Joining Date is required';
  
    const selectedDate = new Date(value);
    const todayDate = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    todayDate.setHours(0, 0, 0, 0);
  
    if (selectedDate > todayDate) {
      return 'Joining Date cannot be in the future';
    }
  
    return undefined;
  };
  
  export const validatePhone = (value: string | undefined): string | undefined => {
    if (!value) return 'Phone is required';
    if (value.replace(/\D/g, '').length < 12) return 'Phone number not valid';
    return undefined;
  };
  
  export const validateEmail = (value: string | undefined): string | undefined => {
    if (!value) {
      return 'Email is required';
    }
  
    // RFC 5322 compliant email regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  
    return undefined;
  };
  
  export const validateBankAccount = (value: string | undefined): string | undefined => {
    if (!value) {
      return 'Bank Account Number is required';
    }
  
    const accountRegex = /^[0-9]{9,18}$/;
  
    if (!accountRegex.test(value)) {
      return 'Please enter a valid bank account number (9-18 digits)';
    }
  
    return undefined;
  };
  
  export const validateIFSC = (value: string | undefined): string | undefined => {
    if (!value) {
      return 'IFSC Code is required';
    }
  
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
    if (!ifscRegex.test(value)) {
      return 'Please enter a valid IFSC code (e.g., SBIN0123456)';
    }
  
    return undefined;
  };