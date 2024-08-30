import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { StampsHistory } from "../target/types/stamps_history";
import { Keypair } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";

describe("Stamp History", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.StampsHistory as Program<StampsHistory>;
  const account = new Keypair();

  it("Is initialized!", async () => {
    // await program.methods
    //   .initiliazeHistory()
    //   .accounts({
    //     stampsHistoryAccount: account.publicKey,
    //   })
    //   .signers([account])
    //   .rpc({ skipPreflight: true });

    const accountData = await program.account.stampsHistory.fetch(
      new PublicKey("5AWNsQUH7sPgPTrvgPYPAMAZXPfCfpX959tSura7vesN")
    );
    console.table(accountData);
    console.log("pubkey", account.publicKey);
  });

  // it("Has updated!", async () => {
  //   await program.methods
  //     .incrementHistory()
  //     .accounts({
  //       stampsHistoryAccount: account.publicKey,
  //     })
  //     .rpc();

  //   const accountData = await program.account.stampsHistory.fetch(account.publicKey);
  //   console.table(accountData);
  //   console.log("pubkey", account.publicKey);
  // });
});
