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
        console.error("Error during logMessage execution:", error);
      } finally {
        setInputValue("");
      }
    }
  };

  return { logMessage };
};

export default useLogMessage;
