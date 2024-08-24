import React from "react";

const page = ({ params }: { params: { pageId: string } }) => {
  return <div>{params.pageId}</div>;
};

export default page;
