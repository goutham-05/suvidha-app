import React from "react";
import {Button, Checkbox, Form, Label} from "semantic-ui-react";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";
import {ServiceModalObject} from "../../config/services";

interface Props {
    modalObject: ServiceModalObject;
}

const value = 1;

const ServiceModalContent: React.FC<Props> = ({modalObject}) => {

    const [obj, setObj] = React.useState(modalObject);

    console.log(obj)

    return (
        <Container>
            {obj.modalType === "form" ?
                <ServiceActionForm parameters={obj.parameters}/> :
                <ServiceActionList parameters={obj.parameters}/>}
        </Container>
    )
}

interface Props1 {
    parameters: string[]
}

const ServiceActionList: React.FC<Props1> = ({parameters}) => {
    return (
        <Container>
            {parameters.map(parameter =>
                <div>
                    <Label>{parameter}</Label>
                    <Button icon='call'></Button>
                    <hr color="black"/>
                </div>
            )}
        </Container>
    )
}

const ServiceActionForm: React.FC<Props1> = ({parameters}) => {
    return (
        <Form>
            {parameters.map(parameter =>
                <div>
                    <Checkbox label={parameter} value={parameter}/>
                    <hr color="black"/>
                </div>
            )}
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default ServiceModalContent