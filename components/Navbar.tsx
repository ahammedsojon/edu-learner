"use client";
import Logo from "@/components/Logo";
import { Button } from "./ui/button";
import { CreditCard, Keyboard, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
                  </DropdownMenuGroup>
                  <DropdownMenuItem>
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
