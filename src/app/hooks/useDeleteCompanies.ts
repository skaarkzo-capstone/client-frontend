import { deleteMultipleCompanies } from "../services/apiService";

export default function useDeleteCompanies(
  showSnackbar: (message: string) => void
) {
  const handleDeleteMultipleCompanies = async (ids: string[]) => {
    try {
      const { success, failed } = await deleteMultipleCompanies(ids);

      if (success.length === 1) {
        showSnackbar(`Company '${success[0].name}' deleted successfully.`);
      } else if (success.length > 1) {
        const companyNames = success.map((comp) => comp.name).join(", ");
        showSnackbar(`Companies ${companyNames} deleted successfully.`);
      } else {
        showSnackbar("No companies were deleted.");
      }

      if (failed.length > 0) {
        showSnackbar(`Failed to delete some companies: ${failed.join(", ")}`);
      }

      return success;
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message || "Failed to delete companies.");
      } else {
        showSnackbar("Failed to delete companies: Unknown error.");
      }
    }
  };

  return { handleDeleteMultipleCompanies };
}
