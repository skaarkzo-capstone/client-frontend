import { deleteMultipleCompanies } from "../services/apiService";

export default function useDeleteCompanies(
  showSnackbar: (message: string) => void
) {
  const handleDeleteMultipleCompanies = async (ids: string[]) => {
    try {
      const response = await deleteMultipleCompanies(ids);

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
      if (error instanceof Error) {
        showSnackbar(`Error deleting companies: ${error.message}`);
      } else {
        showSnackbar("Error deleting companies: Unknown error.");
      }
    }
  };

  return { handleDeleteMultipleCompanies };
}
