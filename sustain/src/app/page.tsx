"use client";

import Link from "next/link";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import evaluateCompanySearch from "./hooks/EvaluateCompanySearch";
import CompanyCard from "./components/CompanyCard";
import CompanyData from "./hooks/CompanyData";

export default function Home() {
  const { inputValue, handleInputChange, logMessage } = evaluateCompanySearch();

  return (
    <div
      className="flex flex-col items-center p-8 pb-40 sm:p-20"
      style={{ backgroundColor: "rgb(37, 37, 37)", minHeight: "100vh" }}
    >
      <div className="absolute top-8 text-white">
        <Link href="/" className="text-[21px] text-white">
          Home
        </Link>
      </div>

      <div className="flex flex-col items-center text-white mt-20">
        <h1 className="text-[67px] font-aboreto mb-8">SUSTAIN</h1>

        <div className="relative mt-4 mb-20">
          <div className="flex items-center w-[400px] bg-[rgb(54,54,54)] border-[rgb(118,118,118)] border rounded-full py-2 px-4">
            <FaSearch className="text-white mr-2" />

            <input
              type="text"
              placeholder="Evaluate a company"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && logMessage()}
              className="flex-grow bg-transparent text-white placeholder-white outline-none"
            />

            <button onClick={logMessage}>
              <div className="flex items-center justify-center w-8 h-8 ml-2 border border-white rounded-full">
                <FaArrowUp className="text-white" />
              </div>
            </button>
          </div>
        </div>

        <h2 className="text-[48px] font-semibold mb-8">Evaluated Companies</h2>

        <div className="flex items-center py-6 px-4 w-[723px] h-[57px] mb-4 font-semibold">
          <span className="text-white font-semibold text-[24px] w-[250px]">
            Company Name
          </span>

          <span className="text-white font-semibold text-[24px] w-[200px] text-center">
            Evaluation Date
          </span>

          <span className="text-white font-semibold text-[24px] ml-auto">
            Score
          </span>
        </div>

        {CompanyData.map((company, index) => (
          <CompanyCard
            key={index}
            name={company.name}
            date={company.date}
            score={company.score}
          />
        ))}
      </div>
    </div>
  );
}
