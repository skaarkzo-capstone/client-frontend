import { deleteCompany } from "../services/apiService";

export default function useDeleteCompany(
  showSnackbar: (message: string) => void
) {
  const handleDeleteCompany = async (companyName: string) => {
    try {
      const response = await deleteCompany(companyName);
      showSnackbar(response.message);
    } catch (error: unknown) {
      if (error instanceof Response) {
        try {
          const errorData = await error.json();
          showSnackbar(errorData.detail || "Failed to delete the company.");
        } catch {
          showSnackbar(
            "Failed to delete the company. Unexpected error occurred."
          );
        }
      } else if (error instanceof Error) {
        showSnackbar(`Error deleting company: ${error.message}`);
      } else {
        showSnackbar("Error deleting company: Unknown error.");
      }
    }
  };

  return { handleDeleteCompany };
}
