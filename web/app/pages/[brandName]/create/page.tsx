const page = ({ params }: { params: { brandName: string } }) => {
  return <div>{params.brandName}</div>;
};

export default page;
