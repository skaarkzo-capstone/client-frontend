import { API_ENDPOINTS } from "@/app/hooks/utils/apiConfigs";

const isError = (error: unknown): error is Error => {
  return typeof error === "object" && error !== null && "message" in error;
};

export const postCompanySearch = async (
  company_name: string,
  checkboxes: { website: boolean; sedar: boolean; news: boolean }
): Promise<Company[]> => {
  const apiUrl = API_ENDPOINTS.POST_COMPANY_SEARCH;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name,
        ...checkboxes,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to retrieve data from backend");
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in API request: ${error.message}`);
    }
    throw new Error("Error in API request: Unknown error");
  }
};

export const fetchEvaluatedCompanies = async (): Promise<Company[]> => {
  const apiUrl = API_ENDPOINTS.FETCH_COMPANY_DATA;
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
