import React from "react";

const NftRewardDescription = ({ nftCount }: { nftCount: number | undefined }) => {
  return (
    <div>
      <p>
        <span className="underline">LOYALTY PROGRAM:</span> Introducing our new loyalty rewards program using SLC (Soloyal Coupon) Tokens! With each purchase, you will receive SLC Tokens directly to
        your wallet. These tokens can then be combined to redeem exclusive perks and discounts on future purchases from the same merchant. Start earning SLC Tokens today and enjoy seamless tracking of
        your loyalty rewards!
      </p>
    </div>
  );
};

export default NftRewardDescription;
