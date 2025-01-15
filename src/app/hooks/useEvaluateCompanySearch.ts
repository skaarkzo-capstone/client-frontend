import { useRef } from "react";
import useInputState from "./utils/useInputState";
import { postCompanySearch } from "../services/apiService";

const useEvaluateCompanySearch = () => {
  const { inputValue, setInputValue, handleInputChange } = useInputState();
  const abortControllerRef = useRef<AbortController | null>(null);

  const logMessage = async (
    companyName: string,
    checkboxes: {
      website: boolean;
      annual_report: boolean;
      responsibility_report: boolean;
    }
  ) => {
    if (!companyName.trim()) {
      throw new Error("Company name cannot be empty.");
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await postCompanySearch(companyName, checkboxes, controller);
      setInputValue("");
    } finally {
      abortControllerRef.current = null;
    }
  };

  const cancelRequest = (onCancel?: () => void) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;

      if (onCancel) onCancel();
    }
  };

  return {
    inputValue,
    handleInputChange,
    logMessage,
    cancelRequest,
  };
};

export default useEvaluateCompanySearch;
