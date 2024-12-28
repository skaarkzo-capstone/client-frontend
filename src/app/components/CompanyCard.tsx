import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "../hooks/utils/formatDate";
import CompanyOverlay from "./CompanyOverlay";
import CompanyScore from "./CompanyScore";
import { getScoreColor } from "../hooks/utils/getScoreColor";
import { getScoreDescription } from "../hooks/utils/getScoreDescription";

type CompanyProps = {
  company: Company;
  isSelected: boolean;
  toggleSelection: (companyName: string) => void;
  showSnackbar: (message: string) => void;
  refreshData: () => void;
};

export default function CompanyCard({
  company,
  isSelected,
  toggleSelection,
  showSnackbar,
  refreshData,
}: CompanyProps) {
  const { bg, border } = getScoreColor(company.score);
  const { title, description } = getScoreDescription(company.score);

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleSelection(company.name)}
        className="mr-4 w-5 h-5"
      />

      <Dialog>
        <DialogTrigger className="flex items-center border rounded-[10px] py-6 px-4 w-[823px] h-[50px] mb-4 bg-[rgb(54,54,54)] border-[rgb(118,118,118)] hover:opacity-70">
          <span className="text-white text-left text-[20px] w-[250px]">
            {company.name}
          </span>
          <span className="text-white text-[20px] w-[200px] mx-auto text-center">
            {formatDate(company.date)}
          </span>

          <CompanyScore
            bg={bg}
            border={border}
            score={company.score}
            title={title}
            description={description}
            width="67px"
            height="33px"
          />
        </DialogTrigger>

        <CompanyOverlay
          key={company.id}
          company={company}
          showSnackbar={showSnackbar}
          onClose={() => document.body.click()}
          refreshData={refreshData}
        />
      </Dialog>
    </div>
  );
}
