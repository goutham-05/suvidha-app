import React from "react";

import { Modal, Segment } from "semantic-ui-react";

interface Props {
  status: boolean;
  title: string;
  setModalState: (status: boolean) => void;
  children?: React.ReactNode;
}

const ServiceModal: React.FC<Props> = ({
  status,
  title,
  setModalState,
  children,
}) => {
  return (
    <Modal
      centered={true}
      open={status}
      onClose={() => setModalState(false)}
      onOpen={() => setModalState(true)}
      closeIcon={true}
    >
      <Segment inverted color="teal" size="large" textAlign="center">
        {title}
      </Segment>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default ServiceModal;
