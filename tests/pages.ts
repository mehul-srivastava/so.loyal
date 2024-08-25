import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Pages } from "../target/types/pages";
import { Keypair } from "@solana/web3.js";

describe("pages", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Pages as Program<Pages>;

  // Generate a new keypair to use as the address the counter account
  const counterAccount = new Keypair();

  it("Is initialized!", async () => {
    // Invoke the initialize instruction
    const transactionSignature = await program.methods
      .initialize()
      .accounts({
        pages: counterAccount.publicKey,
      })
      .signers([counterAccount]) // include counter keypair as additional signer
      .rpc({ skipPreflight: true });

    // Fetch the counter account data
    const accountData = await program.account.pages.fetch(counterAccount.publicKey);

    console.log(`Transaction Signature: ${transactionSignature}`);
    console.log(`Title: ${accountData.title}`);
  });

  it("Increment", async () => {
    const title = "MY TITLE MEHUL";
    // Invoke the increment instruction
    const transactionSignature = await program.methods
      .increment(title)
      .accounts({
        pages: counterAccount.publicKey,
      })
      .rpc();

    // Fetch the counter account data
    const accountData = await program.account.pages.fetch(counterAccount.publicKey);

    console.log(`Transaction Signature: ${transactionSignature}`);
    console.log(`Title: ${accountData.title}`);
  });
});
