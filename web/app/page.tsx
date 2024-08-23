import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import Logo from "@/components/Logo";

const page = () => {
  return (
    <div className="h-full bg-black/95 bg-grid-white text-white">
      <nav className="fixed flex w-full items-center justify-between px-16 py-6">
        <div className="flex items-center gap-x-4">
          <Logo className="w-8" />
          <span className="font-bold">SO.LOYAL</span>
        </div>
        <SignedIn>
          <Link href="/dashboard">
            <div className="flex items-center gap-x-6">Dashboard</div>
          </Link>
        </SignedIn>
      </nav>

      <div className="flex h-full items-center justify-center gap-x-24 px-12">
        <div>
          <h1 className="max-w-[650px] bg-gradient-to-b from-neutral-200 to-neutral-400 bg-clip-text text-4xl font-semibold text-transparent md:text-8xl">
            Reward <br />
            True <span className="bg-clip-text text-green-400">Loyalty.</span>
          </h1>
          <h3 className="mt-8 max-w-[650px] text-2xl text-slate-500">
            Reward your brand's biggest fans, wherever they shop. Keep them
            coming back with exclusive offers and incentives on SolanaPay.
          </h3>
          <SignedOut>
            <Link href="/auth/login">
              <button className="mt-8 rounded-full border-2 border-white bg-green-500 p-3 px-6 text-black shadow-md">
                Get Started
              </button>
            </Link>
          </SignedOut>
        </div>
        <Image
          src={"/header.svg"}
          alt="header"
          height={550}
          width={550}
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default page;
