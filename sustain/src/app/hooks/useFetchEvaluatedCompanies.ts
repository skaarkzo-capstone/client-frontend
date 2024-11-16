import { useEffect, useState } from "react";
import { fetchEvaluatedCompanies } from "../services/apiService";
import useLogMessage from "./useLogMessage";

type Company = {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
};

const useFetchEvaluatedCompanies = () => {
  const { handleError } = useLogMessage("", () => {});
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchEvaluatedCompanies();
        setCompanies(data);
      } catch (error) {
        handleError("Error loading companies", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCompanies();
  }, []);

  return { companies, isLoading };
};

export default useFetchEvaluatedCompanies;
