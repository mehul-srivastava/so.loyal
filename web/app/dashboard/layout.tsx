"use client";
import React from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Logo from "@/components/Logo";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  return (
    <div className="h-full bg-black/95 text-white">
      <nav className="fixed flex h-20 w-full items-center justify-between border-b border-slate-700 px-16 py-6">
        <Logo className="w-8" />
        {!!user?.fullName && (
          <div className="flex items-center gap-x-4">
            <UserButton />
            <div>
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="text-sm">{user?.fullName}</p>
            </div>
          </div>
        )}
      </nav>
      <div className="pt-20">{children}</div>
    </div>
  );
};

export default layout;
