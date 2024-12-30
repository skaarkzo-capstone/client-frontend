import React, { useState } from "react";
import useFetchEvaluatedCompanies from "../hooks/useFetchEvaluatedCompanies";
import useCompanyFilter from "../hooks/useCompanyFilter";
import useDeleteCompanies from "../hooks/useDeleteCompanies";
import CompanyCard from "./CompanyCard";

interface EvaluatedCompaniesProps {
  showSnackbar: (message: string) => void;
  refresh: boolean;
}

export default function EvaluatedCompanies({
  showSnackbar,
  refresh,
}: EvaluatedCompaniesProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [refreshState, setRefreshState] = useState<boolean>(false);
  const refreshData = () => setRefreshState(!refreshState);

  const handleError = (context: string, error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    showSnackbar(`Error in ${context}: ${errorMessage}`);
  };

  const { companies: initialCompanies, isLoading } = useFetchEvaluatedCompanies(
    handleError,
    refresh || refreshState
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
  const { handleDeleteMultipleCompanies } = useDeleteCompanies(showSnackbar);

  const toggleSelection = (companyId: string) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(companyId)
        ? prevSelected.filter((id) => id !== companyId)
        : [...prevSelected, companyId]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedCompanies([]);
    } else {
      const allCompanyIds = filteredData.map((company) => company.id);
      setSelectedCompanies(allCompanyIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    if (selectedCompanies.length === 0) {
      showSnackbar("No companies selected for deletion.");
      return;
    }

    await handleDeleteMultipleCompanies(selectedCompanies);
    setSelectedCompanies([]);
    setRefreshState(!refreshState);
  };

  return (
    <>
      <h2 className="text-[48px] mb-8">Evaluated Companies</h2>

      <div className="relative mt-4 mb-20 flex flex-col items-center">
        <div className="flex items-center w-[400px] bg-[rgb(54,54,54)] border-[rgb(118,118,118)] border rounded-xl py-2 px-4">
          <input
            type="text"
            placeholder="Search evaluated database"
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow bg-transparent text-white placeholder-white outline-none hover:opacity-70"
          />
        </div>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedCompanies.length === 0}
          className={`mt-4 py-2 px-4 rounded-lg ${
            selectedCompanies.length === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700 transition"
          }`}
        >
          Delete Selected
        </button>
      </div>

      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div>
          <div className="flex items-center py-6 px-4 w-[823px] h-[50px] mb-1">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="mr-4 w-5 h-5"
            />
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
                isSelected={selectedCompanies.includes(company.name)}
                toggleSelection={toggleSelection}
                showSnackbar={showSnackbar}
                refreshData={refreshData}
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
