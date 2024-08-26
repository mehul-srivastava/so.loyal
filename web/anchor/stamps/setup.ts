import { AnchorProvider, IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, type StampsPage } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("CpPqrUDwBuh7HJCPfqMEg9VeVnnuiqvQnsGfZSbuc48y");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const getStampsProgram = (wallet: AnchorWallet) => {
  return new Program<StampsPage>(
    IDL,
    programId,
    new AnchorProvider(connection, wallet!, AnchorProvider.defaultOptions()),
  );
};

export type StampsPageData = IdlAccounts<StampsPage>["stampsPage"];
