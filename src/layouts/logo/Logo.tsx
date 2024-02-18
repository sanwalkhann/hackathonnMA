import LogoDark from "../../assets/images/logos/xtremelogo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <div>
        <Image src={LogoDark} alt="logo" />
      </div>
    </Link>
  );
};

export default Logo;
