import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the CSS

const Toast = () => {
  useEffect(() => {
    toast.warn("Username or password incorrect.", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce,
    });
  }, []);

  // You need to include the ToastContainer for the toast to render
  return null;
};

export default Toast;
