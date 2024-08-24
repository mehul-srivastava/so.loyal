"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

import Logo from "@/components/Logo";
import { User } from "@clerk/nextjs/server";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  return (
    <div className="h-full text-white">
      <nav className="fixed flex h-20 w-full items-center z-50 justify-between bg-black border-b border-slate-700 px-16 py-6">
        <Link href="/dashboard">
          <Logo className="w-8" />
        </Link>
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
      <div className="pt-20 bg-black/95">{children}</div>
    </div>
  );
};

export default layout;
