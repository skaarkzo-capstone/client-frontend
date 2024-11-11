"use client";

import Link from "next/link";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import evaluateCompanySearch from "./hooks/EvaluateCompanySearch";

export default function Home() {
  const { inputValue, handleInputChange, logMessage } = evaluateCompanySearch();

  return (
    <div
      className="flex flex-col items-center p-8 pb-40 sm:p-20"
      style={{ backgroundColor: "rgb(37, 37, 37)", minHeight: "100vh" }}
    >
      <div className="absolute top-8 text-white">
        <Link href="/" className="text-[21px] text-white hover:opacity-70">
          Home
        </Link>
      </div>

      <div className="flex flex-col items-center text-white mt-20">
        <h1
          className="text-[67px] mb-8 tracking-widest"
          style={{ fontFamily: "var(--font-aboreto)" }}
        >
          SUST
          <span className="bg-gradient-to-b from-pink-500 to-blue-700 text-transparent bg-clip-text">
            AI
          </span>
          N
        </h1>

        <div className="relative mt-4 mb-20">
          <div className="flex items-center w-[400px] bg-[rgb(54,54,54)] border-[rgb(118,118,118)] border rounded-full py-2 px-4">
            <FaSearch className="text-white mr-4" />

            <input
              type="text"
              placeholder="Evaluate a company"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && logMessage()}
              className="flex-grow bg-transparent text-white placeholder-white outline-none"
            />

            <button onClick={logMessage}>
              <div className="flex items-center justify-center w-8 h-8 ml-2 border border-white rounded-full hover:bg-white hover:bg-opacity-20">
                <FaArrowUp className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
