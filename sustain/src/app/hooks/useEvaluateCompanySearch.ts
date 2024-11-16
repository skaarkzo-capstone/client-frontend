import useInputState from "./utils/useInputState";
import useLogMessage from "./useLogMessage";

const useEvaluateCompanySearch = () => {
  const { inputValue, setInputValue, handleInputChange } = useInputState();
  const { logMessage } = useLogMessage(inputValue, setInputValue);

  return {
    inputValue,
    handleInputChange,
    logMessage,
  };
};

export default useEvaluateCompanySearch;
