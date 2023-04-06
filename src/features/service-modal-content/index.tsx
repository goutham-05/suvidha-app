import React from "react";
import { Button, Checkbox, Form, Label } from "semantic-ui-react";
import Container from "semantic-ui-react/dist/commonjs/elements/Container";

interface Props {
}

const value = 1;

const ServiceModalContent: React.FC<Props> = ({  }) => {
    return (
        <>asda</>
    )
};

interface Props1 {
  parameters: string[];
}

export const ServiceActionList: React.FC<Props1> = ({ parameters }) => {
  return (
    <Container>
      {parameters.map((parameter, index) => (
        <div key={index}>
          <Label>{parameter}</Label>
          <Button icon="call"></Button>
          <hr color="black" />
        </div>
      ))}
    </Container>
  );
};

const ServiceActionForm: React.FC<Props1> = ({ parameters }) => {
  return (
    <Form>
      {parameters.map((parameter, index) => (
        <div key={index}>
          <Checkbox label={parameter} value={parameter} />
          <hr color="black" />
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ServiceModalContent;
