import React, { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getScoreColor } from "../hooks/utils/getScoreColor";
import CompanyScore from "./CompanyScore";
import { getScoreDescription } from "../hooks/utils/getScoreDescription";
import { Switch } from "@/components/ui/switch";
import useComplianceToggle from "../hooks/useComplianceToggle";
import useDeleteCompanies from "../hooks/useDeleteCompanies";
import ConfirmationDialog from "./ConfirmationDialog";

interface CompanyOverlayProps {
  company: Company;
  showSnackbar: (message: string) => void;
  updateCompliance: (companyName: string, compliance: boolean) => void;
  onClose: () => void;
  refreshData: () => void;
}

const CompanyOverlay: React.FC<CompanyOverlayProps> = ({
  company,
  showSnackbar,
  onClose,
  refreshData,
  updateCompliance,
}) => {
  const { bg, border } = getScoreColor(company.score);
  const { title, description } = getScoreDescription(company.score);

  const [compliance, setCompliance] = useState(company.compliance);
  const { handleToggleCompliance } = useComplianceToggle(showSnackbar);

  const toggleCompliance = async () => {
    try {
      const updatedCompanies = await handleToggleCompliance([company.id]);
      if (updatedCompanies.length > 0) {
        const newCompliance = updatedCompanies[0].compliance;
        setCompliance(newCompliance);
        updateCompliance(company.id, newCompliance);
        showSnackbar(
          `Compliance for '${company.name}' is now ${
            newCompliance ? "True" : "False"
          }`
        );
      }
    } catch (error) {
      console.error("Error toggling compliance:", error);
      showSnackbar("Failed to toggle compliance. Please try again.");
    }
  };

  const { handleDeleteMultipleCompanies } = useDeleteCompanies(showSnackbar);

  const confirmDelete = async () => {
    await handleDeleteMultipleCompanies([company.id]);
    refreshData();
    onClose();
  };

  return (
    <DialogContent
      className="bg-[rgb(37,37,37)] text-white p-8 pt-12 pl-16 rounded-[20px] border-none sm:max-w-[70vw] h-[70vh] flex flex-col items-start justify-start"
      style={{ zIndex: 1000 }}
    >
      <div
        className={`absolute right-[65px] top-[75px] flex items-center justify-center text-[30px] mr-0`}
      >
        <CompanyScore
          bg={bg}
          border={border}
          score={company.score}
          title={title}
          description={description}
          width="90px"
          height="50px"
        />
        <ConfirmationDialog
          trigger={
            <button className="ml-4 bg-red-600 text-white text-[14px] py-2 px-4 rounded-lg hover:bg-red-700 transition">
              Delete
            </button>
          }
          title="Confirm Deletion"
          description="Are you sure you want to delete this company? This action cannot be undone."
          onConfirm={confirmDelete}
        />
      </div>

      <DialogHeader>
        <DialogTitle className="text-[60px] font-medium flex items-center">
          {company.name}
          <div className="ml-4">
            <Switch checked={compliance} onCheckedChange={toggleCompliance} />
            <span className="ml-2 text-[20px]">
              Compliance: {compliance ? "True" : "False"}
            </span>
          </div>
        </DialogTitle>
        <hr className="border-white-300 w-[65vw]" />
      </DialogHeader>

      <div className="mt-[130px] items-center justify-center w-full overflow-y-auto overflow-x-hidden">
        <p className="text-[43px] mb-2">Reasoning</p>
        {company.reasoning && Object.entries(company.reasoning).length > 0 ? (
          <div className="text-[24px] mt-5">
            {Object.entries(company.reasoning).map(([key, value]) => (
              <div key={key} className="mb-4">
                <p className="font-semibold capitalize">{key}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[24px]">No reasoning available</p>
        )}
      </div>

      <img
        src="screenshots/footer.webp"
        alt="Sustain Engine"
        className="mx-auto mt-auto w-[400px] h-auto mr-0"
      />
    </DialogContent>
  );
};

export default CompanyOverlay;
