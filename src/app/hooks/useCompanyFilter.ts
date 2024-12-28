import { useState, ChangeEvent } from "react";

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
