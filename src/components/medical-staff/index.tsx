import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

const MedicalStaff = () => {
  return (
    <>
      <Grid columns="2">
        <Grid.Column>
          <Segment textAlign="center">
            <a href="">Clinical Staff</a>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment textAlign="center">
            <a href="">Non Clinical Staff</a>
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid columns={"3"} textAlign="center">
        <Grid.Column width={1} textAlign="center">
          <Button color="teal" icon>
            <Icon name="user doctor" />
          </Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <h2>Nursing Supervisor</h2>
        </Grid.Column>
        <Grid.Column width={1}>
          <Button color="red" icon>
            <Icon name="phone" />
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default MedicalStaff;
