import { useEffect, useState } from "react";
import { fetchEvaluatedCompanies } from "../services/apiService";

type Company = {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
};

const useFetchEvaluatedCompanies = (handleError: (context: string, error: unknown) => void) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchEvaluatedCompanies();
        setCompanies(data);
      } catch (error) {
        handleError("Backend is not responding. Please try again later", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanies();
  }, [handleError]);

  return { companies, isLoading };
};

export default useFetchEvaluatedCompanies;
