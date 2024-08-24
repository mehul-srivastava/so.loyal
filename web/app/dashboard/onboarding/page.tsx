import { redirect } from "next/navigation";

import OnboardingForm from "./_components/onboarding-form";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

async function shouldRedirectToDashboard(userId: string) {
  const merchant = await prisma.merchant.findFirst({
    where: {
      id: userId,
    },
  });

  return merchant;
}

const page = async () => {
  const { userId } = auth();
  (await shouldRedirectToDashboard(userId!)) && redirect("/dashboard");

  return (
    <div className="p-14 px-40 h-full">
      <h2 className="text-3xl">Welcome to our onboarding process 🎁</h2>
      <h4 className="text-xl text-gray-500">
        You can change these later through the settings.
      </h4>

      <div className="mt-14">
        <OnboardingForm />
      </div>
    </div>
  );
};

export default page;
