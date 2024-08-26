use anchor_lang::prelude::*;

declare_id!("7ibPg4fmTEjLufBX4vFUK2ZsG9emD5bGLqnZmfFayKGx");

#[program]
pub mod points_page {
    use super::*;
 
    pub fn initialize_page(ctx: Context<Initialize>, title: String, description: String, price: f32, points: u32, image: String) -> Result<()> {
        let account = &mut ctx.accounts.page_account;

        account.title = title;
        account.description = description;
        account.price = price;
        account.points = points;
        account.image = image;

        msg!("Payment page created for reward type - points!");
        Ok(())
    }

    pub fn update_page(ctx: Context<Update>, title: String, description: String, price: f32, points: u32, image: String) -> Result<()> {
        let account = &mut ctx.accounts.page_account;

        account.title = title;
        account.description = description;
        account.points = points;
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
    pub page_account: Account<'info, PointsPage>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub page_account: Account<'info, PointsPage>,
}
 
#[account]
pub struct PointsPage {
    title: String,
    description: String,
    price: f32,
    points: u32,
    image: String,
}