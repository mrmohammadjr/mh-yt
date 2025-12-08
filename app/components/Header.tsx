import Logo from "@/app/assets/ss.png";
import Image from "next/image";
const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <Image src={Logo} className="w-44" alt={"logo"} />
      <h1 className="text-white text-3xl">Find Any YouTube Video And Watch It</h1>
    </div>
  );
};

export default Header;
