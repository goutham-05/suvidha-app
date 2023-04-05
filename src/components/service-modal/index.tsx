import React from "react";

import {Button, Header, Modal} from 'semantic-ui-react'
import ServiceModalContent from "../../features/service-modal-content";
import {ServiceModalObject} from "../../config/services";

interface Props {
    modalState: boolean,
    title: string,
    setModalState: any
    modalObject: ServiceModalObject
}

const ServiceModal: React.FC<Props> = ({modalState, title, setModalState, modalObject}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal size='tiny' onClose={() => setModalState(false)} open={modalState}>
            <Modal.Header>
                {title}
                <Button circular icon='close' onClick={() => setModalState(false)}/>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>
                        <ServiceModalContent
                            modalObject={modalObject}/>
                    </Header>
                </Modal.Description>
            </Modal.Content>

        </Modal>
    );
}

export default ServiceModal