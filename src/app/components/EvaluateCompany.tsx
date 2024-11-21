import { FaSearch, FaArrowUp } from "react-icons/fa";
import useEvaluateCompanySearch from "../hooks/useEvaluateCompanySearch";

interface EvaluateCompanyProps {
  showSnackbar: (message: string) => void;
}

export default function EvaluateCompany({
  showSnackbar,
}: EvaluateCompanyProps) {
  const { inputValue, handleInputChange, logMessage } =
    useEvaluateCompanySearch();

  const handleLogMessage = () => {
    if (!inputValue.trim()) {
      showSnackbar("Company name cannot be empty. Please enter a valid name.");
      return;
    }
    logMessage();
  };

  return (
    <div className="relative mt-4 mb-36">
      <div className="flex items-center w-[400px] bg-[rgb(54,54,54)] border-[rgb(118,118,118)] border rounded-full py-2 px-4">
        <FaSearch className="text-white mr-4" />

        <input
          type="text"
          placeholder="Evaluate a company"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleLogMessage()}
          className="flex-grow bg-transparent text-white placeholder-white outline-none hover:opacity-70"
        />

        <button onClick={handleLogMessage}>
          <div className="flex items-center justify-center w-8 h-8 ml-2 border border-white rounded-full hover:bg-white hover:bg-opacity-20">
            <FaArrowUp className="text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
