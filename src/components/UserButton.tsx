"use client";

import { logoutAction } from "@/actions/user";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function UserButton() {
  const router = useRouter();

  const handleSignout = async () => {
    const toastId = toast.loading("Singning out...");
    await logoutAction();

    router.replace("/login");
    toast.dismiss(toastId);
  };

  return (
    <button className="cursor-pointer" onClick={handleSignout}>
      Log Out
    </button>
  );
}

export default UserButton;
