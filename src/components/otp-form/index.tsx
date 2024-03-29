import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import {
  Button,
  Grid, Form,
  Message,
  Label
} from "semantic-ui-react";
import { getOtp, validateOtp } from "../../features/login/authSlice";
import { useForm } from "react-hook-form";
import CInput from "../../common/input";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { useEffect, useState } from "react";

interface Props {
}

const OtpForm: React.FC<Props> = ({ }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { status, otpSuccess , data: userData } = useAppSelector((state: RootState) => state.user);

  const getMobile = localStorage.getItem('Login');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [mobile, setMobile] = useState('');
  const [ipNumber, setIpNumber] = useState('');

  
  useEffect(() => {
    if (status === 'succeeded' && otpSuccess) {
      navigate("/services");
    }
  }, [status, otpSuccess])
  

  const onSubmitForm = (data: any) => {
    const otpData = {
      mobile_number: userData?.mobile_number,
    admissionno: userData?.admissionno,
    otp: data.otp
    }

    dispatch(validateOtp(otpData))

  };

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
              <Button type="submit" loading={false} style={{background: '#E41B47', width: '100%'}}>
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
