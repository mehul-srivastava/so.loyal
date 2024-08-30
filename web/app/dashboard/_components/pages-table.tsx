import Link from "next/link";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";

const PaymentPagesTable = async () => {
  const pages = await prisma.page.findMany({
    include: {
      merchant: {
        select: {
          websiteName: true,
        },
      },
    },
  });

  return (
    <div className="mt-20 rounded-lg shadow-lg">
      <div className="mb-5 flex w-full items-center justify-between">
        <h2 className="text-2xl">Payment Pages</h2>
        <Link href="/dashboard/payment-pages">
          <Button className="block" variant="secondary">
            Create Payment Page
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-b-gray-700 hover:bg-gray-100/10">
            <TableHead className="w-10 text-base uppercase tracking-wide">#</TableHead>
            <TableHead className="w-2/5 text-base uppercase tracking-wide">URL</TableHead>
            <TableHead className="w-2/5 text-base uppercase tracking-wide">Program Key</TableHead>
            <TableHead className="w-1/5 text-base uppercase tracking-wide">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page, idx) => (
            <TableRow className="border-b-gray-700 text-white/80 hover:bg-gray-100/10 hover:text-white">
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>
                <Link href={`/pages/${page.merchant.websiteName}/${page.id}`} className="text-white/80 hover:underline" prefetch={false}>
                  /pages/{page.merchant.websiteName}/{page.id}
                </Link>
              </TableCell>
              <TableCell>{page.programPublicKey}</TableCell>
              <TableCell>{new Date(page.createdAt).toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentPagesTable;
