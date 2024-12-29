import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getScoreColor } from "../hooks/utils/getScoreColor";
import CompanyScore from "./CompanyScore";
import { getScoreDescription } from "../hooks/utils/getScoreDescription";

interface CompanyOverlayProps {
  company: Company;
}

const CompanyOverlay: React.FC<CompanyOverlayProps> = ({ company }) => {
  const { bg, border } = getScoreColor(company.score);
  const { title, description } = getScoreDescription(company.score);

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
      </div>

      <DialogHeader>
        <DialogTitle className="text-[60px] font-medium">
          {company.name}
        </DialogTitle>
        <hr className="border-white-300 w-[65vw]" />
      </DialogHeader>

      <div className="mt-[130] items-center justify-center w-full overflow-y-auto overflow-x-hidden">
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
