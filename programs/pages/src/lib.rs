use anchor_lang::prelude::*;

declare_id!("Due8TAGvBMeKWY8XaFXVnLgQZj5FdVbKUVUrWDyQU2ye");

#[program]
pub mod pages {
    use super::*;
 
    pub fn initialize_page(ctx: Context<Initialize>, title: String, description: String, price: f32, reward: String, image: String) -> Result<()> {
        let pages_account = &mut ctx.accounts.pages;

        pages_account.title = title;
        pages_account.description = description;
        pages_account.price = price;
        pages_account.reward = reward;
        pages_account.image = image;
        

        msg!("Pages account created!");
        Ok(())
    }

    pub fn update_page(ctx: Context<Update>, title: String, description: String, price: f32, image: String) -> Result<()> {
        let pages_account = &mut ctx.accounts.pages;

        pages_account.title = title;
        pages_account.description = description;
        pages_account.price = price;
        pages_account.image = image;
        

        msg!("Pages account updated!");
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
        space = 8 + 8 + 32 + 32 + 32 + 32 + 32
    )]
    pub pages: Account<'info, Pages>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub pages: Account<'info, Pages>,
}
 
#[account]
pub struct Pages {
    title: String,
    description: String,
    price: f32,
    reward: String,
    image: String,
}