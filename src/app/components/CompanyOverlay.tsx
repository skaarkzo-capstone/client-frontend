import React, { useRef } from "react";

type Company = {
  id: string;
  name: string;
  date: string;
  score: number;
  reasoning: string;
};

interface CompanyOverlayProps {
  company: Company;
  onClose: () => void;
}

const CompanyOverlay: React.FC<CompanyOverlayProps> = ({
  company,
  onClose,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div
        ref={overlayRef}
        className="bg-[rgb(37,37,37)] text-white p-8 pt-12 pl-16 rounded-[20px] relative shadow-2xl"
        style={{ width: "70vw", height: "70vh" }}
      >
        <div className="absolute right-20 top-20 flex items-center justify-center text-white border rounded-[10px] text-[20px] w-[67px] h-[33px] border-[rgb(118,118,118)]">
          {company.score}
        </div>

        <h2 className="text-[60px] font-bold mb-4">{company.name}</h2>
        <p className="text-[43px] mb-2">Reasoning</p>
        <p className="text-[24px]">{company.reasoning}</p>
      </div>
    </div>
  );
};

export default CompanyOverlay;
