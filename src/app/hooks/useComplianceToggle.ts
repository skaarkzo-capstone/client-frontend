import { toggleCompanyCompliance } from "../services/apiService";

export default function useComplianceToggle(
  showSnackbar: (message: string) => void
) {
  const handleToggleCompliance = async (ids: string[]) => {
    try {
      const { success, failed } = await toggleCompanyCompliance(ids);

      if (success.length === 1) {
        showSnackbar(
          `Compliance for company '${success[0].name}' updated successfully.`
        );
      } else if (success.length > 1) {
        const companyNames = success.map((comp) => comp.name).join(", ");
        showSnackbar(
          `Compliance for companies ${companyNames} updated successfully.`
        );
      } else {
        showSnackbar("No companies were updated.");
      }

      if (failed.length > 0) {
        showSnackbar(
          `Failed to update compliance for some companies: ${failed
            .map((f) => f.id)
            .join(", ")}`
        );
      }

      return success;
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message || "Failed to toggle compliance.");
      } else {
        showSnackbar("Failed to toggle compliance: Unknown error.");
      }
      return [];
    }
  };

  return { handleToggleCompliance };
}
