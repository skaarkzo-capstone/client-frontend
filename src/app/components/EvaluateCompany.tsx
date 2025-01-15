import { FaSearch, FaArrowUp } from "react-icons/fa";
import useEvaluateCompanySearch from "../hooks/useEvaluateCompanySearch";
import { useState } from "react";

interface EvaluateCompanyProps {
  showSnackbar: (message: string) => void;
  triggerRefresh: () => void;
}

export default function EvaluateCompany({
  showSnackbar,
  triggerRefresh,
}: EvaluateCompanyProps) {
  const { inputValue, handleInputChange, logMessage, cancelRequest } =
    useEvaluateCompanySearch();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    website: true,
    annual_report: true,
    responsibility_report: true,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleLogMessage = async () => {
    if (!inputValue.trim()) {
      showSnackbar("Company name cannot be empty. Please enter a valid name.");
      return;
    }

    if (!Object.values(checkboxes).some((value) => value)) {
      showSnackbar("You must select at least one checkbox.");
      return;
    }

    showSnackbar(`Starting evaluation of ${inputValue}...`);
    setIsButtonDisabled(true);

    try {
      await logMessage(inputValue, checkboxes);
      triggerRefresh();
    } catch (error) {
      showSnackbar("An error occurred. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleCancelRequest = () => {
    cancelRequest(() => showSnackbar("Request cancelled"));
    setIsButtonDisabled(false);
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
          disabled={isButtonDisabled}
          className="flex-grow bg-transparent text-white placeholder-white outline-none hover:opacity-70"
        />

        <button
          onClick={isButtonDisabled ? handleCancelRequest : handleLogMessage}
          disabled={isButtonDisabled && !cancelRequest}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 ml-2 border rounded-3xl ${
              isButtonDisabled
                ? "loading loading-spinner loading-xs"
                : "hover:bg-white hover:bg-opacity-20"
            }`}
          >
            <FaArrowUp className="text-white" />
          </div>
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-6">
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            name="website"
            checked={checkboxes.website}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Website
        </label>
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            name="annual_report"
            checked={checkboxes.annual_report}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Annual Report
        </label>
        <label className="flex items-center text-white">
          <input
            type="checkbox"
            name="responsibility_report"
            checked={checkboxes.responsibility_report}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Responsibility Report
        </label>
      </div>
    </div>
  );
}
