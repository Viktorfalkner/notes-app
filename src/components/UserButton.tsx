"use client";

import { UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logoutAction } from "@/actions/user";
import { cn } from "@/lib/utils";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

type Props = {
  user: User;
  className?: string;
};

function UserButton({ user, className }: Props) {
  const router = useRouter();

  const handleSignout = async () => {
    const toastId = toast.loading("Signing out...");
    await logoutAction();
    router.replace("/login");
    toast.dismiss(toastId);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "text-secondary hover:text-primary transition-colors duration-200 ease-in-out",
          className,
        )}
      >
        <UserCircle className="size-10 sm:size:12" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 mt-5 sm:mt-4">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout} className="rounded-md p-2">
          <h3 className="text-sm">Log out</h3>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
