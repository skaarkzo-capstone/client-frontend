import { useState } from "react";
import { postCompanySearch } from "../services/apiService";

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
        const result = await postCompanySearch(inputValue);
        console.log("Received from backend:", result);
      } catch (error) {
        handleError("Error during company search", error);
      } finally {
        setInputValue("");
      }
    }
  };

  const handleError = (contextMessage: string, error: unknown) => {
    console.error(`${contextMessage}:`, error);

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
