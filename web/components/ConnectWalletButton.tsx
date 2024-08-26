"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

// Options for buttons: WalletConnectButton, WalletDisconnectButton, WalletMultiButton, WalletModalButton

const ReactUIWalletConnectButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const ReactUIWalletDisconnectButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletDisconnectButton,
  { ssr: false }
);

export const ConnectThirdPartyWalletButton = () => {
  return (
    <ReactUIWalletConnectButtonDynamic
      style={{
        background: "#fff",
        color: "#000",
        padding: "4px",
      }}
    />
  );
};

export const DisconnectThirdPartyWalletButton = () => {
  return <ReactUIWalletDisconnectButtonDynamic style={{}} />;
};

interface Web3WalletButtonProps {
  action: "connect" | "disconnect";
  text: string;
  onClickFn?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Web3WalletButton = ({ action, text, onClickFn }: Web3WalletButtonProps) => {
  const { setVisible } = useWalletModal();
  const { disconnect } = useWallet();

  function handler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (action === "disconnect") {
      disconnect();
      if (onClickFn) onClickFn(e);
    }
    if (action === "connect") setVisible(true);
  }

  return (
    <Button
      variant="link"
      className="text-white px-0 font-normal text-xs"
      onClick={(e) => handler(e)}
    >
      {text}
    </Button>
  );
};
