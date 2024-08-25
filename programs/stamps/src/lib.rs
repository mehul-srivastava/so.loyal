use anchor_lang::prelude::*;

declare_id!("Bq879qyHmwZ7GWmz1FZBaKqwvH6iiSpzAJjYZuKFYKuz");


#[program]
pub mod stamps {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
