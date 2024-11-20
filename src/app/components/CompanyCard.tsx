import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "../hooks/utils/formatDate";
import CompanyOverlay from "./CompanyOverlay";

type CompanyProps = {
  company: {
    id: string;
    name: string;
    date: string;
    score: number;
    reasoning: string;
  };
};

export default function CompanyCard({ company }: CompanyProps) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center border rounded-[10px] py-6 px-4 w-[723px] h-[50px] mb-4 bg-[rgb(54,54,54)] border-[rgb(118,118,118)] hover:opacity-70">
        <span className="text-white text-left text-[20px] w-[250px]">
          {company.name}
        </span>
        <span className="text-white text-[20px] w-[200px] text-center">
          {formatDate(company.date)}
        </span>
        <span className="flex items-center justify-center text-white border rounded-[10px] text-[20px] w-[67px] h-[33px] ml-auto border-[rgb(118,118,118)]">
          {company.score}
        </span>
      </DialogTrigger>

      <CompanyOverlay key={company.id} company={company} />
    </Dialog>
  );
}
