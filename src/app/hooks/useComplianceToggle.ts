import { toggleCompanyCompliance } from "../services/apiService";

export default function useComplianceToggle(
  showSnackbar: (message: string) => void
) {
  const handleToggleCompliance = async (companyName: string) => {
    try {
      const response = await toggleCompanyCompliance(companyName);
      showSnackbar(response.message);
    } catch (error: unknown) {
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          showSnackbar(
            errorData.detail || "Failed to toggle compliance. Please try again."
          );
        } catch {
          showSnackbar(error.message || "Failed to toggle compliance.");
        }
      } else if (typeof error === "object" && error !== null) {
        showSnackbar(
          `Error toggling compliance: ${JSON.stringify(error, null, 2)}`
        );
      } else {
        showSnackbar("Error toggling compliance: Unknown error.");
      }
    }
  };

  return { handleToggleCompliance };
}
