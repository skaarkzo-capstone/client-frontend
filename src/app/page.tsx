"use client";

import Link from "next/link";
import { Snackbar, Alert } from "@mui/material";
import { FaSearch, FaArrowUp } from "react-icons/fa";
import useEvaluateCompanySearch from "./hooks/useEvaluateCompanySearch";
import CompanyCard from "./components/CompanyCard";
import useFetchEvaluatedCompanies from "./hooks/useFetchEvaluatedCompanies";
import useCompanyFilter from "./hooks/useCompanyFilter";

export default function Home() {
  const {
    inputValue,
    handleInputChange,
    logMessage,
    snackbar,
    closeSnackbar,
    handleError,
  } = useEvaluateCompanySearch();

  const { companies, isLoading } = useFetchEvaluatedCompanies(handleError);

  const { searchQuery, handleSearchChange, filteredData } =
    useCompanyFilter(companies);

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
              className="flex-grow bg-transparent text-white placeholder-white outline-none hover:opacity-70"
            />

            <button onClick={logMessage}>
              <div className="flex items-center justify-center w-8 h-8 ml-2 border border-white rounded-full hover:bg-white hover:bg-opacity-20">
                <FaArrowUp className="text-white" />
              </div>
            </button>
          </div>
        </div>

        <h2 className="text-[48px] mb-8">Evaluated Companies</h2>

        <div className="relative mt-4 mb-20">
          <div className="flex items-center w-[400px] bg-[rgb(54,54,54)] border-[rgb(118,118,118)] border rounded-full py-2 px-4">
            <input
              type="text"
              placeholder="Search evaluated database"
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow bg-transparent text-white placeholder-white outline-none hover:opacity-70"
            />
          </div>
        </div>

        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div>
            <div className="flex items-center py-6 px-4 w-[723px] h-[57px] mb-4">
              <span className="text-white text-[24px] w-[250px]">
                Company Name
              </span>
              <span className="text-white text-[24px] w-[200px] text-center">
                Evaluation Date
              </span>
              <span className="text-white text-[24px] ml-auto">Score</span>
            </div>

            {filteredData.length > 0 ? (
              filteredData.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))
            ) : (
              <p className="text-white mt-4">No companies found</p>
            )}
          </div>
        )}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
