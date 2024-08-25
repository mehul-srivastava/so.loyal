use anchor_lang::prelude::*;

declare_id!("BG5jXZkjdu5zJjDZvncLBRi1LNBVo23Q8W1uxBCiMAn9");


#[program]
pub mod stamps {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
