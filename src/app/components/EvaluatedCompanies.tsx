import React from "react";
import useFetchEvaluatedCompanies from "../hooks/useFetchEvaluatedCompanies";
import useCompanyFilter from "../hooks/useCompanyFilter";
import CompanyCard from "./CompanyCard";

interface EvaluatedCompaniesProps {
  showSnackbar: (message: string) => void;
  refresh: boolean;
}

export default function EvaluatedCompanies({
  showSnackbar,
  refresh,
}: EvaluatedCompaniesProps) {
  const handleError = (context: string, error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    showSnackbar(`Error in ${context}: ${errorMessage}`);
  };

  const { companies: initialCompanies, isLoading } = useFetchEvaluatedCompanies(
    handleError,
    refresh
  );

  const [companies, setCompanies] = React.useState<Company[]>([]);

  React.useEffect(() => {
    setCompanies(initialCompanies);
  }, [initialCompanies]);

  const updateCompliance = (companyName: string, compliance: boolean) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.name === companyName ? { ...company, compliance } : company
      )
    );
  };

  const { searchQuery, handleSearchChange, filteredData } =
    useCompanyFilter(companies);

  return (
    <>
      <h2 className="text-[48px] mb-8">Evaluated Companies</h2>

      <div className="relative mt-4 mb-20">
        <div className="flex items-center w-[400px] bg-[rgb(54,54,54)] border-[rgb(118,118,118)] border rounded-xl py-2 px-4">
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
          <div className="flex items-center py-6 px-4 w-[823px] h-[50px] mb-1">
            <span className="text-white text-[24px] w-[180px] text-center mr-16">
              Company Name
            </span>
            <span className="text-white text-[24px] w-[180px] text-center mr-12">
              Evaluation Date
            </span>
            <span className="text-white text-[24px] w-[180px] text-center mr-7">
              Score
            </span>
            <span className="text-white text-[24px] w-[170px] text-center">
              Compliance
            </span>
          </div>

          {filteredData.length > 0 ? (
            filteredData.map((company, index) => (
              <CompanyCard
                key={company.id || `${company.name}-${index}`}
                company={company}
                showSnackbar={showSnackbar}
                updateCompliance={updateCompliance}
              />
            ))
          ) : (
            <p className="text-white text-center mt-6">No companies found</p>
          )}
        </div>
      )}
    </>
  );
}
