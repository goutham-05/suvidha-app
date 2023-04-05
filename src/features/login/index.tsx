import { useLocation } from "react-router-dom";
import { Grid, Image } from "semantic-ui-react";

function Login() {
  const {
    state: { selectedLanguage },
  } = useLocation();

  return (
    <Grid container centered>
      <Grid.Column>
        <Image src="/images/wireframe/image.png" />
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/wireframe/image.png" />
      </Grid.Column>
      <Grid.Column>
        <Image src="/images/wireframe/image.png" />
      </Grid.Column>
    </Grid>
  );
}

export default Login;
