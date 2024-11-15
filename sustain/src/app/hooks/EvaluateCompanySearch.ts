import { useState } from "react";

export default function EvaluateCompanySearch() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const logMessage = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await fetch("http://localhost:8000/api/main/search/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName: inputValue }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Received from backend:", result);
        } else {
          console.error("Failed to retrieve data from backend");
        }
      } catch (error) {
        console.error("Error:", error);
      }

      setInputValue("");
    }
  };

  return {
    inputValue,
    handleInputChange,
    logMessage,
  };
}
