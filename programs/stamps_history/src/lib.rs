use anchor_lang::prelude::*;

declare_id!("47RVTDVSkuTeiqPHEEWWnMxQwQpEefNNJA8ztPbwcvTQ");

#[program]
pub mod stamps_history {
    use super::*;

    pub fn initiliaze_history(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.stamps_history_account;

        account.count = 0;

        msg!("Account history initialized - stamps! {}", account.count);
        Ok(())
    }

    pub fn increment_history(ctx: Context<Update>) -> Result<()> {
        let account = &mut ctx.accounts.stamps_history_account;

        account.count += 1;
    
        msg!("Account history - stamps incremented! {}", account.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
 
    #[account(
        init,
        payer = user,
        space = 8 + 100 + 500 + 50 + 100 + 200
    )]
    pub stamps_history_account: Account<'info, StampsHistory>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub stamps_history_account: Account<'info, StampsHistory>,
}
 

#[account]
pub struct StampsHistory {
    count: u64,
}