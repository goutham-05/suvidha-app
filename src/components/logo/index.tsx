import { Icon, Image } from "semantic-ui-react";

import logo from "../../assets/brandLogo.png";

interface Props {}

const BrandLogo: React.FC<Props> = () => {
  return (
    <Image
      style={{
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
        height: "50%",
        marginTop: "10%",
        marginBottom: "25%",
      }}
      src={logo}
      circular
    />
  );
};

export default BrandLogo;
