import { toast } from "react-toastify";

export const ReactToast = (type, msg) => {
  toast[type](msg, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
