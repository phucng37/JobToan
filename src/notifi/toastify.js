import { toast } from "react-toastify";

export const ToastSuccess = (title) => {
  toast.success(title);
};
export const ToastError = (title) => {
  toast.error(title);
};
export const ToastWarning = (title) => {
  toast.warning(title);
};
