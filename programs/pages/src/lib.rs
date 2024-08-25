use anchor_lang::prelude::*;

declare_id!("FfBbewrAkpAP7HfDBL4zPrubA8F28xZiaL612HLHzjZd");

#[program]
pub mod pages {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
