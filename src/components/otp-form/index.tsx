import { useLocation } from "react-router-dom";
import {
  Button,
  Grid, Form,
  Message,
  Label
} from "semantic-ui-react";

import { useForm } from "react-hook-form";
import CInput from "../../common/input";

interface Props {
  onSubmit: (data: any) => void;
}

const OtpForm: React.FC<Props> = ({ onSubmit }) => {
  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data: any) => {
    onSubmit(data);
  };

  return (
    <>
      <Message positive>
        <Message.Header>Enter OTP sent to 9875632987</Message.Header>
        <p>OR</p> <p>Enter OTP sent to nikhil@gmail.com</p>
      </Message>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <CInput
                placeholder="Enter OTP"
                register={register}
                label="otp"
                required={true}
                size="large"
                error={errors["otp"] ? true : false}
                fluid={true}
                loading={false}
              />
              {errors.otp?.type === "required" && (
                <Label color="orange" pointing prompt>
                  OTP is required
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row stretched>
            <Grid.Column>
              <Button type="submit" loading={false} color="red">
                Submit
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

export default OtpForm;
