import { useLocation } from "react-router-dom";
import { Button, Grid, Form, Label } from "semantic-ui-react";

import { useForm } from "react-hook-form";
import CInput from "../../common/input";

interface Props {
  onSubmit: (data: any) => void;
}

const UserForm: React.FC<Props> = ({ onSubmit }) => {
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
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <CInput
                placeholder="Mobile Number / Email"
                register={register}
                label="username"
                required={true}
                size="large"
                error={errors["Mobile Number / Email"] ? true : false}
                fluid={true}
                loading={false}
              />
              {errors.username?.type === "required" && (
                <Label color="orange" pointing prompt>
                  Mobile Number / Email is required
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <CInput
                label="ipNumber"
                placeholder="IP Number"
                register={register}
                required={true}
                size="large"
                error={errors["IP Number"] ? true : false}
                fluid={true}
                loading={false}
              />
              {errors.ipNumber?.type === "required" && (
                <Label color="orange" pointing prompt>
                  IP Number is required
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Button type="submit" loading={false} color="red">
                Get OTP
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

export default UserForm;
