import { Icon, Image } from "semantic-ui-react";

import logo from "../../assets/Logo.png";

const initialStyles = {
  // width: "20%",
  // marginLeft: "auto",
  // marginRight: "auto",
  // height: "20%",
  // marginBottom: "25%",
};

interface Props {
  size?:
    | "mini"
    | "tiny"
    | "small"
    | "medium"
    | "large"
    | "big"
    | "huge"
    | "massive";
  styles?: any;
}

const BrandLogo: React.FC<Props> = ({ size = "massive", styles }) => {
  return <Image style={styles ? styles : initialStyles} src={logo} circular />;
};

export default BrandLogo;
