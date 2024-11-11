import Link from "next/link";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
      style={{ backgroundColor: "rgb(37, 37, 37)" }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h3 className="text-[21px] mb-4">
          <Link href="/">Home</Link>
        </h3>
        <h1 className="text-[67px] font-aboreto">SUSTAIN</h1>
      </div>
    </div>
  );
}