import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

const Ambulance = () => {
  return (
    <>
      <Grid textAlign="center">
        <Grid.Column width={6} textAlign="center">
          <Button color="teal" icon>
            <Icon size="large" name="ambulance" />
          </Button>
          <span style={{ padding: "10px" }}>Call Red Ambulance</span>
        </Grid.Column>
      </Grid>
      <Grid textAlign="center">
        <Grid.Column width={5}>
          <Button color="red" icon>
            <Icon name="phone" />
            <span style={{ padding: "10px" }}>Call</span>
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Ambulance;
