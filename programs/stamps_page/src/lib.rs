use anchor_lang::prelude::*;

declare_id!("CpPqrUDwBuh7HJCPfqMEg9VeVnnuiqvQnsGfZSbuc48y");

#[program]
pub mod stamps_page {
    use super::*;
 
    pub fn initialize_page(ctx: Context<Initialize>, title: String, description: String, price: f32, stamp_count: u32, image: String) -> Result<()> {
        let account = &mut ctx.accounts.page_account;

        account.title = title;
        account.description = description;
        account.price = price;
        account.stamp_count = stamp_count;
        account.image = image;

        msg!("Payment page created for reward type - stamps!");
        Ok(())
    }

    pub fn update_page(ctx: Context<Update>, title: String, description: String, price: f32, stamp_count: u32, image: String) -> Result<()> {
        let account = &mut ctx.accounts.page_account;

        account.title = title;
        account.description = description;
        account.stamp_count = stamp_count;
        account.price = price;
        account.image = image;
        

        msg!("Payment page updated!");
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
    pub page_account: Account<'info, StampsPage>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub page_account: Account<'info, StampsPage>,
}
 
#[account]
pub struct StampsPage {
    title: String,
    description: String,
    price: f32,
    stamp_count: u32,
    image: String,
}