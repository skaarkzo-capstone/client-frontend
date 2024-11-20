type CompanyProps = {
  name: string;
  date: string;
  score: number;
  onClick: () => void;
};

export default function CompanyCard({
  name,
  date,
  score,
  onClick,
}: CompanyProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center border rounded-[10px] py-6 px-4 w-[723px] h-[50px] mb-4 bg-[rgb(54,54,54)] border-[rgb(118,118,118)] hover:opacity-70"
    >
      <span className="text-white text-left text-[20px] w-[250px]">{name}</span>

      <span className="text-white text-[20px] w-[200px] text-center">
        {date}
      </span>

      <span className="flex items-center justify-center text-white border rounded-[10px] text-[20px] w-[67px] h-[33px] ml-auto border-[rgb(118,118,118)]">
        {score}
      </span>
    </button>
  );
}
