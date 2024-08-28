import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

import Main from "./_components/main";

const page = async ({
  params,
}: {
  params: { brandName: string; pageId: string };
}) => {
  if (!params.brandName || !params.pageId) return redirect("/");

  const merchant = await prisma.merchant.findFirst({
    where: {
      websiteName: params.brandName,
    },
    select: {
      id: true,
      brandColor: true,
      websiteName: true,
      walletPublicAddress: true,
      supportPhone: true,
      supportEmail: true,
    },
  });

  if (!merchant) {
    return redirect("/");
  }

  const page = await prisma.page.findFirst({
    where: {
      id: params.pageId,
    },
    select: {
      id: true,
      programPublicKey: true,
    },
  });

  if (!page) {
    return redirect("/");
  }

  const borderStyles = { borderColor: merchant?.brandColor };

  return (
    <div className="flex h-full w-full items-start justify-center bg-[#f8f8f8] md:items-center">
      <div
        className="fixed left-0 top-0 hidden h-full border-r-[10px] md:block"
        style={borderStyles}
      />

      <Main merchant={merchant} page={page} params={params} />
    </div>
  );
};

export default page;
