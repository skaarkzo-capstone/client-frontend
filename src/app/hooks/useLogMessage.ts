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
    let errorMessage = `${contextMessage}: An unknown error occurred`;

    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      errorMessage = "Backend is not responding. Please try again later.";
    } else if (error instanceof Error && error.message.includes("Request timed out")) {
      errorMessage = "The database is not responding. Please try again later.";
    } else if (
      error instanceof Error &&
      error.message.includes("Database not responding")
    ) {
      errorMessage = "Database is not responding. Please contact support.";
    } else if (error instanceof Error) {
      errorMessage = `${contextMessage}: ${error.message}`;
    }

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
