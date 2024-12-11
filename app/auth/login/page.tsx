import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="h-screen overflow-auto flex items-center justify-center container w-full">
      <div className="grid grid-cols-2 w-full">
        <div className="col-span-1 flex items-center">
          <LoginForm />
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
