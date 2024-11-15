import { useReducer, useState } from "react";
import { evaluateCompany } from "./companyService";
import {
  FETCH_INIT,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  evaluateReducer,
  State,
} from "./EvaluateCompanyActions";

const initialState: State = {
  isLoading: false,
  data: null,
  error: null,
};

export default function EvaluateCompanySearch() {
  const [state, dispatch] = useReducer(evaluateReducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const logMessage = async () => {
    if (inputValue.trim() === "") return;

    dispatch({ type: FETCH_INIT });

    try {
      const result = await evaluateCompany(inputValue);
      dispatch({ type: FETCH_SUCCESS, payload: result });
      console.log("Received from backend:", result);
    } catch (error) {
      dispatch({ type: FETCH_FAILURE, error: (error as Error).message });
      console.error("Error:", error);
    }

    setInputValue("");
  };

  return {
    inputValue,
    handleInputChange,
    logMessage,
    ...state,
  };
}
