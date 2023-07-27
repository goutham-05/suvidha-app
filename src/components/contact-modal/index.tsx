import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

const ContactModal = () => {
  return (
    <Grid>
      {["Floor Manager", "Nursing In Charge", "Financial Counselor"].map(
        (item, index) => (
          <Grid.Row key={index}>
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
              <Button color="red" icon>
                <Icon size="large" name="phone" />
              </Button>
            </Grid.Column>
            <hr
              color="gray"
              style={{
                width: "100%",
              }}
            />
          </Grid.Row>
        )
      )}
    </Grid>
  );
};

export default ContactModal;
