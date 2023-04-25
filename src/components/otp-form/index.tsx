import { useLocation, useSearchParams } from "react-router-dom";
import {
  Button,
  Grid, Form,
  Message,
  Label
} from "semantic-ui-react";
import { getOtp } from "../../features/login/authSlice";
import { useForm } from "react-hook-form";
import CInput from "../../common/input";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { useEffect, useState } from "react";


interface Props {
  onSubmit: (data: any) => void;
}

const OtpForm: React.FC<Props> = ({ onSubmit }) => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const getMobile = localStorage.getItem('Login');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [mobile, setMobile] = useState('');
  const [ipNumber, setIpNumber] = useState('');

  const onSubmitForm = (data: any) => {
    onSubmit(data);
    console.log('OTP-Screen',data);
  };

  // TODO
  // 1.fetch user data from redux store using useAppSelector 
  // 2.create object with otp api params and values along with token value
  // 3.In slice file create object only with otp 

  return (
    <>
      <Message style={{marginTop: "-80px", border: 'none'}}>
        <Message.Header style={{color: '#374F4F'}}>Enter OTP sent to {getMobile}</Message.Header>
        <p style={{color: '#374F4F'}}>Or</p> <Message.Header style={{color: '#374F4F'}}>Enter OTP sent to nikhil@gmail.com</Message.Header>
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
              <Button type="submit" loading={false} style={{background: '#E41B47'}}>
                <h1 style={{color: 'white', fontSize: '15px'}}>Submit</h1>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

export default OtpForm;
