import { useState } from "react";

const useLogMessage = (
  inputValue: string,
  setInputValue: (value: string) => void
) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const logMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
      } catch (error) {
        handleError("Error during company search", error);
      } finally {
        setInputValue("");
      }
    }
  };

  const handleError = (contextMessage: string, error: unknown) => {
    const errorMessage =
      error instanceof Error
        ? `${contextMessage}: ${error.message}`
        : `${contextMessage}: An unknown error occurred`;

    setSnackbar({
      open: true,
      message: errorMessage,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return { logMessage, handleError, snackbar, closeSnackbar };
};

export default useLogMessage;
