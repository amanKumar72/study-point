import { Bounce, toast } from "react-toastify";

const payload = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const warnmessage = (msg) => {
  return toast.warn(msg, payload);
};

export const successmessage = (msg) => {
  return toast.success(msg, payload);
};

export const loadingmessage = (msg) => {
 return  toast.loading(msg, payload);
};

export const errormessage = (msg) => {
 return  toast.error(msg, payload);
};

export const updatemessage = (toastId, type, text) => {
  return toast.update(toastId, {
    render: text,
    type: type,
    isLoading: false,
    autoClose: 3000,
  });
};
