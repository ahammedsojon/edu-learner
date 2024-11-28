import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
type Role = "instructor" | "student";

interface RegisterFormProps {
  params: {
    role: Role;
  };
}
export default function RegsiterPage({ params: { role } }: RegisterFormProps) {
  return (
    <div className="flex items-center justify-center container w-full py-16">
      <div className="grid grid-cols-2 w-full">
        <div className="col-span-1 flex items-center">
          <RegisterForm role={role} />
        </div>
        <div className="col-span-1">
          <Image
            src={`/assets/images/auth.svg`}
            alt="auth"
            className="max-w-full w-full h-full !relative"
            fill
          />
        </div>
      </div>
    </div>
  );
}
