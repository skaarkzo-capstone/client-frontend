type Company = {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
};

const isError = (error: unknown): error is Error => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const postCompanySearch = async (
  companyName: string
): Promise<Company[]> => {
  const apiUrl = "http://localhost:8000/api/main/company";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: companyName,
        website: true,
        sedar: true
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to retrieve data from backend");
    }

    return await response.json();
  } catch (error: unknown) {
    if (isError(error)) {
      throw new Error(`Error in API request: ${error.message}`);
    }
    throw new Error("Error in API request: Unknown error");
  }
};

export const fetchEvaluatedCompanies = async (): Promise<Company[]> => {
  const apiUrl = "http://localhost:8000/api/main/companies";
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(apiUrl, { signal: controller.signal });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const errorMessage =
        errorBody?.message || response.statusText || "Unknown server error";

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (isError(error) && error.name === "AbortError") {
      throw new Error(
        "Request timed out. The server took too long to respond."
      );
    }

    if (isError(error)) {
      throw new Error(`Error fetching evaluated companies: ${error.message}`);
    }

    throw new Error("Error fetching evaluated companies: Unknown error");
  }
};
