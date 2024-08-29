import React from "react";

const StampRewardDescription = ({ pointCount }: { pointCount: number | undefined }) => {
  return (
    <div>
      <p>
        <span className="underline">LOYALTY PROGRAM:</span> Introducing our exciting loyalty
        program! Earn a stamp with every purchase and unlock a freebie after collecting a certain
        number of stamps. It's our way of thanking you for being a loyal customer. Start collecting
        those stamps and treat yourself to a freebie after every {pointCount} purchases. Happy
        rewarding!
      </p>
    </div>
  );
};

export default StampRewardDescription;
