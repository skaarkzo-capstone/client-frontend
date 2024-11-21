import Link from "next/link";

export default function Header() {
  return (
    <div className="absolute top-8 text-white">
      <Link href="/" className="text-[21px] text-white hover:opacity-70">
        Home
      </Link>
    </div>
  );
}
