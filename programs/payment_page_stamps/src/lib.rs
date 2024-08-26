use anchor_lang::prelude::*;

declare_id!("4jVkFiF35erAvhSUCKWqt7VpLZD7LdqGMJyMkkHvhyP2");

#[program]
pub mod payment_page_stamps {
    use super::*;
 
    pub fn initialize_page(ctx: Context<Initialize>, title: String, description: String, price: f32, stamp_count: u32, image: String) -> Result<()> {
        let account = &mut ctx.accounts.stamps_page;

        account.title = title;
        account.description = description;
        account.price = price;
        account.stamp_count = stamp_count;
        account.image = image;

        msg!("Payment page created for reward type - stamps!");
        Ok(())
    }

    pub fn update_page(ctx: Context<Update>, title: String, description: String, price: f32, stamp_count: u32, image: String) -> Result<()> {
        let account = &mut ctx.accounts.stamps_page;

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
    pub stamps_page: Account<'info, PaymentPageStamps>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub stamps_page: Account<'info, PaymentPageStamps>,
}
 
#[account]
pub struct PaymentPageStamps {
    title: String,
    description: String,
    price: f32,
    stamp_count: u32,
    image: String,
}