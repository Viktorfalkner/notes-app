import React from "react";
import { getUser } from "@/lib/auth";
import { Lilita_One } from "next/font/google";
import NewNoteButton from "./NewNoteButton";
import UserButton from "./UserButton";

const lilita = Lilita_One({ weight: "400", subsets: ["latin"] });

export default async function Header() {
  const user = await getUser();

  return (
    <div className="bg-slate-800 relative mt-2 flex h-20 w-full max-w-5xl items-center justify-between rounded-lg px-4">
      <UserButton />
      <h1 className={`text-4xl sm:text-5xl text-secondary ${lilita.className}`}>
        Fire Notes
      </h1>
      <NewNoteButton />
    </div>
  );
}
