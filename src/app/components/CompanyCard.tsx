import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "../hooks/utils/formatDate";
import CompanyOverlay from "./CompanyOverlay";

type CompanyProps = {
  company: Company;
  isSelected: boolean;
  toggleSelection: (companyName: string) => void;
  showSnackbar: (message: string) => void;
  refreshData: () => void;
  updateCompliance: (companyName: string, compliance: boolean) => void;
};

export default function CompanyCard({
  company,
  isSelected,
  toggleSelection,
  showSnackbar,
  refreshData,
  updateCompliance,
}: CompanyProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelection(company.id)}
        className="mr-4 w-5 h-5"
      />

      <Dialog>
        <DialogTrigger className="flex items-center border rounded-[10px] py-6 px-4 w-[623px] h-[50px] mb-4 bg-[rgb(54,54,54)] border-[rgb(118,118,118)] hover:opacity-70">
          <span className="text-white text-[20px] w-[180px] text-center mr-16">
            {company.name}
          </span>
          <span className="text-white text-[20px] w-[180px] text-center mr-12">
            {formatDate(company.date)}
          </span>
          <span className="text-white text-[20px] w-[170px] text-center">
            {company.compliance ? "True" : "False"}
          </span>
        </DialogTrigger>

        <CompanyOverlay
          key={company.id}
          company={company}
          showSnackbar={showSnackbar}
          updateCompliance={updateCompliance}
          onClose={() => document.body.click()}
          refreshData={refreshData}
        />
      </Dialog>
    </div>
  );
}
