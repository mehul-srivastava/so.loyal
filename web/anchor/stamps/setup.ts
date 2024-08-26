import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, type StampsPage } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("CpPqrUDwBuh7HJCPfqMEg9VeVnnuiqvQnsGfZSbuc48y");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<StampsPage>(IDL, programId, {
  connection,
});

// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
export type StampsPageData = IdlAccounts<StampsPage>["stampsPage"];
