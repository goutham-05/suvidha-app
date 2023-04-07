import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  theme?: "light" | "dark" | "colored";
  message: string;
  status: "idle" | "loading" | "failed" | "succeeded";
}

const MessageNotification: React.FC<Props> = ({
  position = "top-right",
  autoClose = 1000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  theme = "light",
  message,
  status,
}) => {
  useEffect(() => {
    if (status === "succeeded") {
      toast.success(message);
    } else if (status === "failed") {
      toast.error(message);
    }
  }, [message, status]);
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      theme={theme}
    />
  );
};

export default MessageNotification;
