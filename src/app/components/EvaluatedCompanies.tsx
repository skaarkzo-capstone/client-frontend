import useFetchEvaluatedCompanies from "../hooks/useFetchEvaluatedCompanies";
import useCompanyFilter from "../hooks/useCompanyFilter";
import CompanyCard from "./CompanyCard";

interface EvaluatedCompaniesProps {
  showSnackbar: (message: string) => void;
}

export default function EvaluatedCompanies({
  showSnackbar,
}: EvaluatedCompaniesProps) {
  const handleError = (context: string, error: unknown) => {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    showSnackbar(`Error in ${context}: ${errorMessage}`);
  };

  const { companies, isLoading } = useFetchEvaluatedCompanies(handleError);
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
          <div className="flex items-center py-6 px-4 w-[823px] h-[57px] mb-4">
            <span className="text-white text-[24px] w-[250px]">
              Company Name
            </span>
            <span className="text-white text-[24px] mx-auto w-[200px] text-center">
              Evaluation Date
            </span>
            <span className="text-white text-[24px] ml-auto">Score</span>
          </div>

          {filteredData.length > 0 ? (
            filteredData.map((company, index) => (
              <CompanyCard
                key={company.id || `${company.name}-${index}`}
                company={company}
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
