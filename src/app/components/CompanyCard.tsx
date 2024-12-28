import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "../hooks/utils/formatDate";
import CompanyOverlay from "./CompanyOverlay";
import { getColor } from "../hooks/utils/getColor";
import clsx from "clsx";

type CompanyProps = {
  company: Company;
};

export default function CompanyCard({ company }: CompanyProps) {
  const { bg, border } = getColor(company.score);

  return (
    <Dialog>
      <DialogTrigger className="flex items-center border rounded-[10px] py-6 px-4 w-[823px] h-[50px] mb-4 bg-[rgb(54,54,54)] border-[rgb(118,118,118)] hover:opacity-70">
        <span className="text-white text-left text-[20px] w-[250px]">
          {company.name}
        </span>
        <span className="text-white text-[20px] w-[200px] mx-auto text-center">
          {formatDate(company.date)}
        </span>
        <span
          className={clsx(
            "text-white text-[20px] w-[67px] h-[33px] ml-auto rounded-[10px] text-center",
            bg,
            border
          )}
        >
          {company.score}
        </span>
      </DialogTrigger>

      <CompanyOverlay key={company.id} company={company} />
    </Dialog>
  );
}
