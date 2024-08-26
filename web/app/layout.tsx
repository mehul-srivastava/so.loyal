import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";

import "./globals.css";
import ToastProvider from "@/components/providers/toast-provider";
import Web3WalletProvider from "@/components/providers/web3-wallet-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Soloyal - The only loyalty centric payment gateway",
  description: "Soloyal is a solana-based loyalty centric payment gateway for merchants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Web3WalletProvider>
        <html lang="en">
          <body className={poppins.className}>
            <ToastProvider />
            {children}
          </body>
        </html>
      </Web3WalletProvider>
    </ClerkProvider>
  );
}
