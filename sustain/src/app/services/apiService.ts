export const postCompanySearch = async (companyName: string): Promise<any> => {
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
