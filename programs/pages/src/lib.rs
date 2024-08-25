use anchor_lang::prelude::*;

declare_id!("Due8TAGvBMeKWY8XaFXVnLgQZj5FdVbKUVUrWDyQU2ye");

#[program]
pub mod pages {
    use super::*;
 
    // Instruction to initialize a new pages account
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // Reference to the pages account from the Initialize struct
        let pages_account = &ctx.accounts.pages;
        msg!("Pages account created!");
        Ok(())
    }
 
    // Instruction to increment a pages account
    pub fn increment(ctx: Context<Increment>, title: String) -> Result<()> {
        // Mutable reference to the pages account from the Increment struct
        let pages_account = &mut ctx.accounts.pages;
        pages_account.title = title;
        
        // Accept data from rpc call and put on account
        // pages_account.title = title;
 
        // msg!("Pages account updated! Current title: {}", pages_account.title);
        Ok(())
    }
}
 
// Accounts required by the initialize instruction
#[derive(Accounts)]
pub struct Initialize<'info> {
    // The account paying to create the counter account
    #[account(mut)]
    pub user: Signer<'info>, // specify account must be signer on the transaction
 
    // The counter account being created and initialized in the instruction
    #[account(
        init,         // specifies we are creating this account
        payer = user, // specifies account paying for the creation of the account
        space = 8 + 8 + 32 + 32 + 32 + 32 + 32 // space allocated to the new account (8 byte discriminator + 8 byte for u64)
    )]
    pub pages: Account<'info, Pages>, // specify account is 'Pages' type
    pub system_program: Program<'info, System>, // specify account must be System Program
}
 
// Account required by the increment instruction
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)] // specify account is mutable because we are updating its data
    pub pages: Account<'info, Pages>, // specify account is 'Pages' type
}
 
// Define structure of `Pages` account
#[account]
pub struct Pages {
    title: String, // define title value type as String
}