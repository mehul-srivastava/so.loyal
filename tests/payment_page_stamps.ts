import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PaymentPageStamps } from "../target/types/payment_page_stamps";
import { Keypair } from "@solana/web3.js";

describe("Stamp Pages", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.PaymentPageStamps as Program<PaymentPageStamps>;
  const account = new Keypair(); // my understanding: these keypair are for particular blocks in the blockchain, you must store the public key to make edits to it

  it("Is initialized!", async () => {
    let title = "title";
    let description = "description";
    let price = 20.99;
    let stampCount = 10;
    let image = "google.com/image";

    await program.methods
      .initializePage(title, description, price, stampCount, image)
      .accounts({
        stampsPage: account.publicKey,
      })
      .signers([account])
      .rpc({ skipPreflight: true });

    const accountData = await program.account.paymentPageStamps.fetch(account.publicKey);
    console.table(accountData);
    console.log("pubkey", account.publicKey);
  });

  it("Has updated!", async () => {
    let updatedTitle = "Updated cohort 2.0";
    let updatedDescription = "Updated description";
    let updatedPrice = 5.99;
    let updatedStampCount = 1;
    let updatedImage = "jstseguru.in/image";

    await program.methods
      .updatePage(
        updatedTitle,
        updatedDescription,
        updatedPrice,
        updatedStampCount,
        updatedImage
      )
      .accounts({
        stampsPage: account.publicKey,
      })
      .rpc();

    const accountData = await program.account.paymentPageStamps.fetch(account.publicKey);
    console.table(accountData);
    console.log("pubkey", account.publicKey);
  });
});
