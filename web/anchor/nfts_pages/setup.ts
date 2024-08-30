import { AnchorProvider, IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, type NftsPage } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import { AnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("8ayZJ9QMbXBg8viRCoCVLSPukKZjZkiUWLBj42niVBcz");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const getNftsProgram = (wallet: AnchorWallet) => {
  return new Program<NftsPage>(IDL, programId, new AnchorProvider(connection, wallet!, AnchorProvider.defaultOptions()));
};

export type NftsPageData = IdlAccounts<NftsPage>["nftsPage"];
