import { useEffect, useState } from "react";
import { fetchEvaluatedCompanies } from "../services/apiService";

const useFetchEvaluatedCompanies = (
  handleError: (context: string, error: unknown) => void,
  refresh: boolean
) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await fetchEvaluatedCompanies();
      setCompanies(data);
    } catch (error) {
      handleError("Trouble reaching backend. Please try again later", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, [refresh]);

  return { companies, isLoading };
};

export default useFetchEvaluatedCompanies;
