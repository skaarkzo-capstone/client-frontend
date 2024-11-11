import { useState } from "react";

export default function EvaluateCompanySearch() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const logMessage = () => {
    if (inputValue.trim() !== "") {
      console.log(inputValue);
      setInputValue("");
    }
  };

  return {
    inputValue,
    handleInputChange,
    logMessage,
  };
}
