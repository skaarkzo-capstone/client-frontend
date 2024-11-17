import useInputState from "./utils/useInputState";
import useLogMessage from "./useLogMessage";

const useEvaluateCompanySearch = () => {
  const { inputValue, setInputValue, handleInputChange } = useInputState();
  const { logMessage, handleError, snackbar, closeSnackbar } = useLogMessage(
    inputValue,
    setInputValue
  );

  return {
    inputValue,
    handleInputChange,
    logMessage,
    handleError,
    snackbar,
    closeSnackbar,
  };
};

export default useEvaluateCompanySearch;
