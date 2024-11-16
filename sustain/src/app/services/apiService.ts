type Company = {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
};

export const postCompanySearch = async (
  companyName: string
): Promise<Company[]> => {
  const apiUrl = "http://localhost:8000/api/main/search/";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName }),
    });

    if (!response.ok) {
      throw new Error("Failed to retrieve data from backend");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

export const fetchEvaluatedCompanies = async (): Promise<Company[]> => {
  const apiUrl = "http://localhost:8000/api/main/companies";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching evaluated companies:", error);
    throw error;
  }
};
