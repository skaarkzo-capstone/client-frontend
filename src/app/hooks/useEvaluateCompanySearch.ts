import useInputState from "./utils/useInputState";
import { postCompanySearch } from "../services/apiService";

const useEvaluateCompanySearch = () => {
  const { inputValue, setInputValue, handleInputChange } = useInputState();

  const logMessage = async (
    companyName: string,
    checkboxes: { website: boolean; sedar: boolean; news: boolean }
  ) => {
    if (!companyName.trim()) {
      throw new Error("Company name cannot be empty.");
    }
    await postCompanySearch(companyName, checkboxes);
    setInputValue("");
  };

  return {
    inputValue,
    handleInputChange,
    logMessage,
  };
};

export default useEvaluateCompanySearch;
