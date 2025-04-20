import { Bounce, toast } from "react-toastify";

const payload= {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  }

export const warnmessage=(msg)=>{
  toast.warn(msg, payload);
}

export const successmessage=(msg)=>{
    toast.success(msg, payload);
}

export const errormessage=(msg)=>{
    toast.error(msg, payload);
}