import Image from "next/image";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Image src="/logo.svg" className={className} alt="logo" height={48} width={49} />
  );
};

export default Logo;
