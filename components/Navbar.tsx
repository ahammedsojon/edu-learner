"use client";
import Logo from "@/components/Logo";
import { Button } from "./ui/button";
import {
  CreditCard,
  Keyboard,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <header className="w-full h-[65px] flex items-center backdrop-blur-[40px] border-b">
      <div className="container flex items-center justify-between">
        <Logo />
        <div>
          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Avatar /> */}
                  <Button
                    variant="ghost"
                    className="hover:bg-[transparent] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                  >
                    <Avatar />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => router.push("/auth/login")}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
