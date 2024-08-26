import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Pages } from "../target/types/pages";
import { Keypair, PublicKey } from "@solana/web3.js";

describe("pages", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Pages as Program<Pages>;
  const pagesAccount = new Keypair(); // my understanding: these keypair are for particular blocks in the blockchain, you must store the public key to make edits to it

  it("Is initialized!", async () => {
    await program.methods
      .initializePage(
        "Cohort 2.0",
        "Best in class course",
        20.12,
        "stamp",
        "google.com/image"
      )
      .accounts({
        pages: pagesAccount.publicKey,
      })
      .signers([pagesAccount])
      .rpc({ skipPreflight: true });

    const accountData = await program.account.pages.fetch(pagesAccount.publicKey);
    console.table(accountData);
    console.log("pubkey", pagesAccount.publicKey);
  });

  it("Has updated!", async () => {
    let updatedTitle = "Updated cohort 2.0";
    let updatedDescription = "Updated description";
    let updatedPrice = 5.99;
    let updatedImage = "jstseguru.in/image";

    await program.methods
      .updatePage(updatedTitle, updatedDescription, updatedPrice, updatedImage)
      .accounts({
        pages: pagesAccount.publicKey,
      })
      .rpc();

    const accountData = await program.account.pages.fetch(pagesAccount.publicKey);
    console.table(accountData);
    console.log("pubkey", pagesAccount.publicKey);
  });
});
