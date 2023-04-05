import { Icon } from "semantic-ui-react";

interface Props {
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const BrandLogo: React.FC<Props> = ({
  size = "huge",
}) =>  {
  return (
    <Icon.Group size={size}>
      <Icon size="big" name="circle outline" />
      <Icon name="user" />
    </Icon.Group>
  );
}

export default BrandLogo;
