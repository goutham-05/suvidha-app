import { Icon, Image } from "semantic-ui-react";

import logo from "../../assets/brandLogo.png";

const initialStyles = {
  width: "70%",
  marginLeft: "auto",
  marginRight: "auto",
  height: "50%",
  marginTop: "10%",
  marginBottom: "25%",
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
  console.log("styles", styles);

  return <Image style={styles ? styles : initialStyles} src={logo} circular />;
};

export default BrandLogo;
