'use client'

import Image from "next/image";
import { logoutAction } from "@/actions/user";
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";


export default function Home() {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogoutButtonClick = async () => {
      startTransition(async () => {
        const { errorMessage } = await logoutAction();
        if (!errorMessage) {
          router.replace("/");
          toast.success("Successfully logged in");
        } else {
          toast.error(errorMessage);
        }
      });
    };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white">
      App
      <button className="h-[50px] w-[400px] border border-white text-white" onClick={handleLogoutButtonClick}>
        Logout
      </button>
      </div>
  );
}
