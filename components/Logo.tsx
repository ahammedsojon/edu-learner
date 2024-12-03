import Link from "next/link";

const Logo = ({ type }: { type: string }) => {
  return (
    <Link
      href={"/"}
      className={`italic font-bold block ${type ? "text-lg" : "text-2xl"}`}
    >
      EduLearner
    </Link>
  );
};

export default Logo;
