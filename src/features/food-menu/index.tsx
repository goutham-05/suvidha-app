import { Button, Icon, Segment } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Search from "semantic-ui-react/dist/commonjs/modules/Search";
import Navbar from "../../components/nav-bar";

const FoodMenu = () => {
  return (
    <>
      <Navbar />

      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Search
              size="large"
              fluid
              loading={false}
              results={[]}
              value={""}
            />
          </Grid.Column>
          <Grid.Column>
            <Icon color="teal" name="shopping bag" size="big" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns="6">
        <Grid.Row >
          <Grid.Column mobile={5} tablet={4} computer={4}>
            <Button positive>Veg</Button>
          </Grid.Column>
          <Grid.Column mobile={5} tablet={4} computer={4}>
            <Button positive>Jain</Button>
          </Grid.Column>
          <Grid.Column mobile={5} tablet={4} computer={4}>
            <Button positive>Button</Button>
          </Grid.Column>
          <Grid.Column mobile={5} tablet={4} computer={4}>
            <Button positive>Button</Button>
          </Grid.Column>
          <Grid.Column mobile={5} tablet={4} computer={4}>
            <Button positive>Button</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div>FoodMenu</div>
    </>
  );
};

export default FoodMenu;
