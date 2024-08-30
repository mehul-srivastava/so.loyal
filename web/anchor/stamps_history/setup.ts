import { AnchorProvider, IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, type StampsHistory } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";

const programId = new PublicKey("47RVTDVSkuTeiqPHEEWWnMxQwQpEefNNJA8ztPbwcvTQ");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const getStampsHistory = (wallet: AnchorWallet) => {
  return new Program<StampsHistory>(
    IDL,
    programId,
    new AnchorProvider(connection, wallet!, AnchorProvider.defaultOptions()),
  );
};

export type StampsPageData = IdlAccounts<StampsHistory>["stampsHistory"];
