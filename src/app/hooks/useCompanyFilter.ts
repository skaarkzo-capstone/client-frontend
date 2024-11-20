import { useState, ChangeEvent } from "react";

interface Company {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
}

export default function useCompanyFilter(companies: Company[]) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return { searchQuery, handleSearchChange, filteredData };
}
