use anchor_lang::prelude::*;

declare_id!("4qmPQ9rGYEC5HNTotXfHC2xNs87UfesJX3KQEfVaRaUm");

#[program]
pub mod soloyal {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
