import { deleteMultipleCompanies } from "../services/apiService";

export default function useDeleteCompanies(
  showSnackbar: (message: string) => void
) {
  const handleDeleteMultipleCompanies = async (companyNames: string[]) => {
    try {
      const response = await deleteMultipleCompanies(companyNames);

      const success = response.success || [];
      const failed = response.failed || [];

      if (failed.length === 0) {
        showSnackbar(response.message);
      } else {
        showSnackbar(
          `Some companies could not be deleted: ${failed.join(", ")}`
        );
      }
    } catch (error: unknown) {
      if (error instanceof Response) {
        try {
          const errorData = await error.json();
          showSnackbar(
            errorData.detail?.message || "Failed to delete companies."
          );
        } catch {
          showSnackbar(
            "Failed to delete companies. Unexpected error occurred."
          );
        }
      } else if (error instanceof Error) {
        showSnackbar(`Error deleting companies: ${error.message}`);
      } else {
        showSnackbar("Error deleting companies: Unknown error.");
      }
    }
  };

  return { handleDeleteMultipleCompanies };
}
