import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center bg-slate-200">
      {children}
    </div>
  );
};

export default layout;
