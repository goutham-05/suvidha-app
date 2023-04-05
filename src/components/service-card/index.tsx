import React, { useCallback } from "react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Card from "semantic-ui-react/dist/commonjs/views/Card";
import {SemanticICONS} from "semantic-ui-react/src/generic";
import ServiceModal from "../service-modal";
import {ServiceModalObject, serviceModalObjects} from "../../config/services";

interface Props {
  title: string;
  icon: SemanticICONS;
  path: string;
  onClick?: (event: React.SyntheticEvent<HTMLElement>, data: any) => void;
  size?: "mini" | "tiny" | "small" | "large" | "big" | "huge" | "massive";
}

const ServiceCard: React.FC<Props> = ({ title, icon, size, path, onClick }) => {
  const [modalState, setModalState] = React.useState(false)

  const serviceHasModal = serviceModalObjects.find(service => service.title === title);

  console.log(title, serviceHasModal)

  let modal;
  if (serviceHasModal) {
      let modalObject = serviceModalObjects.find((serviceModalObject: ServiceModalObject) => serviceModalObject.title = title)!

      console.log(modalObject)

      modal = <ServiceModal
          modalState={modalState}
          title={title}
          setModalState={setModalState}
          modalObject={modalObject}
      />
  }


  return (
    <>
      <Card onClick={onClick} centered>
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
