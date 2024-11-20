import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Company = {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
};

interface CompanyOverlayProps {
  company: Company;
}

const CompanyOverlay: React.FC<CompanyOverlayProps> = ({ company }) => {
  return (
    <DialogContent className="bg-[rgb(37,37,37)] text-white p-8 pt-12 pl-16 rounded-[20px] border-none sm:max-w-[70vw] h-[70vh] flex flex-col items-start justify-start">
      <div className="absolute right-20 flex items-center justify-center text-white border rounded-[10px] text-[30px] w-[90px] h-[50px] border-[rgb(118,118,118)]">
        {company.score}
      </div>

      <DialogHeader>
        <DialogTitle className="text-[60px] font-bold mb-4">
          {company.name}
        </DialogTitle>
      </DialogHeader>

      <div className="mt-20">
        <p className="text-[43px] font-semibold mb-2">Reasoning</p>
        <p className="text-[24px]">{company.reasoning}</p>
      </div>
    </DialogContent>
  );
};

export default CompanyOverlay;
