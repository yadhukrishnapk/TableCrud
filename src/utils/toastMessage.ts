// src/utils/toastMessage.ts
import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify';

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccessToast = (message: string): void => {
  toast.success(message, toastOptions);
};

export const showErrorToast = (message: string): void => {
  toast.error(message, toastOptions);
};