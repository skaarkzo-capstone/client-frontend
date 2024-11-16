import { postCompanySearch } from "../services/apiService";

const useLogMessage = (
  inputValue: string,
  setInputValue: (value: string) => void
) => {
  const logMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
        const result = await postCompanySearch(inputValue);
        console.log("Received from backend:", result);
      } catch (error) {
        handleError("Error during logMessage execution", error);
      } finally {
        setInputValue("");
      }
    }
  };

  const handleError = (contextMessage: string, error: unknown) => {
    console.error(`${contextMessage}:`, error);
  };

  return { logMessage, handleError };
};

export default useLogMessage;
