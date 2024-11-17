import { useState } from "react";

const useInputState = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, setInputValue, handleInputChange };
};

export default useInputState;
