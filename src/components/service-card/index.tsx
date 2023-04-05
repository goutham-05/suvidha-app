import React from "react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import { SemanticICONS } from "semantic-ui-react/src/generic";

interface Props {
  title: string;
  icon: SemanticICONS;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const ServiceCard: React.FC<Props> = ({ title, icon, size }) => {
  return (
    <>
      <Card onClick={() => console.log("")} centered>
        <Card.Content textAlign="center">
          <Icon color="teal" size={size} name={icon} />
          <hr color="black" />
          <Card.Description>{title}</Card.Description>
        </Card.Content>
        <Card.Content textAlign="right" extra>
          <a>
            <Icon color="black" name="long arrow alternate right" />
          </a>
        </Card.Content>
      </Card>
    </>
  );
};

export default ServiceCard;
