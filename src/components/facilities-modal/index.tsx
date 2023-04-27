import axios from "axios";
import React, { useEffect, useState } from "react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Checkbox from "semantic-ui-react/dist/commonjs/modules/Checkbox";

const FacilitiesModal = () => {

  const [facilitiesAvailable, setFacilitiesAvailable] = useState([]);

  const getServices = async () => {
    var response = await axios.post(
      "http://10.20.100.179:4000/api/get-service-data-bytype",
      {
        service_type: "1",
      },
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGVfbnVtYmVyIjoiOTAzMDc4OTY0MCIsImFkbWlzc2lvbm5vIjoiSVAyMzI0MDAyMDQ0IiwiaWF0IjoxNjgyNTA1ODU3LCJleHAiOjE2ODI1MDk0NTd9.t8C9o1Rgdqv7SfUS6PEKc5wlF05bxz9v_cFqOFgENlY"}`,
        },
      }
      
    );
    setFacilitiesAvailable(response.data.data);
  };

  useEffect(() => {
    getServices();
  }, []);

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
