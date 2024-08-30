import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, type PointsPage } from "./idl";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const programId = new PublicKey("7ibPg4fmTEjLufBX4vFUK2ZsG9emD5bGLqnZmfFayKGx");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
export const program = new Program<PointsPage>(IDL, programId, {
  connection,
});

// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
export type PointsPageData = IdlAccounts<PointsPage>["pointsPage"];
