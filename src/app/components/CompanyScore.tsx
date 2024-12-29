import clsx from "clsx";
import * as HoverCard from "@radix-ui/react-hover-card";

type CompanyScoreProps = {
  bg: string;
  border: string;
  score: number;
  title: string;
  description: string;
  width?: string;
  height?: string;
};

export default function CompanyScore({
  bg,
  border,
  score,
  title,
  description,
  width = "67px",
  height = "33px",
}: CompanyScoreProps) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <span
          className={clsx(
            "text-white text-center cursor-pointer rounded-[10px]",
            bg,
            border
          )}
          style={{
            width,
            height,
            lineHeight: height,
            display: "inline-block",
          }}
        >
          {score}
        </span>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="bg-white text-black p-4 rounded-lg shadow-lg text-center w-[380px] break-words"
          style={{ zIndex: 1050 }}
        >
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
