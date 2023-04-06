import React from "react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Checkbox from "semantic-ui-react/dist/commonjs/modules/Checkbox";

const FacilitiesModal = () => {
  return (
    <Grid>
      {[
        "TV not Working",
        "Fan not Working",
        "Phone not Working",
        "Lights not Working",
        "AC not Working",
        "Nursing call bell not Working",
        "Bed features not Working",
      ].map((item, index) => (
        <Grid.Row>
          <Grid.Column width={8} textAlign="justified">
            <span
              style={{
                padding: "10px",
                fontSize: "26px",
                fontWeight: "bold",
              }}
            >
              {item}
            </span>
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <Checkbox
              style={{
                top: "10px",
                background: "red !important",
                border: "1px solid red !important",
                backgroungColor: "red !important",
                accentColor: "red !important",
              }}
            />
          </Grid.Column>
          <hr
            color="gray"
            style={{
              width: "100%",
            }}
          />
        </Grid.Row>
      ))}
      <Grid.Column width={16} textAlign="center">
        <Button color="red">Submit</Button>
      </Grid.Column>
    </Grid>
  );
};
export default FacilitiesModal;
