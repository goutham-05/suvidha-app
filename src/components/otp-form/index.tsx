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
import { useTranslation } from "react-i18next";
import MessageNotification from '../../common/notification';
interface Props {
}

function formatMobileNumber(getMobile:any) {
  const visibleDigits = 4;
  const hiddenDigits = getMobile.length - visibleDigits;
  const firstDigits = getMobile.substring(0, hiddenDigits);
  const lastDigits = getMobile.substring(hiddenDigits);
  const hiddenNumbers = '*'.repeat(hiddenDigits);
  return `${hiddenNumbers}${lastDigits}`;
}

const OtpForm: React.FC<Props> = ({}) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["otp"]);

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<"idle" | "loading" | "failed" | "succeeded">("idle");

  const { otpSuccess , data: userData } = useAppSelector((state: RootState) => state.user);

  localStorage.setItem("mobile_number", userData.mobile_number);
  const getMobile = localStorage.getItem('mobile_number');

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
  
  const db = useAppSelector((state) => state.db.db);
  const onSubmitForm = async (data: any) => {
    setStatus("idle");
    const otp = await db.getItem(userData.ip_no);
    if (otp === null || otp != data.otp) {
      setMessage('Invalid OTP');
      setStatus('failed');
    } else {
      const otp = await db.setItem('token',userData.token);
      localStorage.setItem("token", userData.token);
      navigate("/services");
    }
  };

  const formattedNumber = formatMobileNumber(getMobile);
  return (
    <>
    <MessageNotification message={message} status={status} theme="dark" />
      <Message style={{marginTop: '-28%', justifyContent: 'center', border: 'none'}}>
        <Message.Header style={{color: '#374F4F'}}>{t('Enter OTP sent to')}  {formattedNumber}</Message.Header>
        {/* <p style={{color: '#374F4F'}}>Or</p> <Message.Header style={{color: '#374F4F'}}>Enter OTP sent to nikhil@gmail.com</Message.Header> */}
      </Message>
      <Form onSubmit={handleSubmit(onSubmitForm)} style={{marginLeft: '10%'}}>
        <Grid columns="equal">
          <Grid.Row stretched>
            <Grid.Column>
              <CInput
                placeholder={t('Enter OTP')}
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
              <Button type="submit" loading={false} style={{background: '#0075ad', width: '100%'}}>
                <h1 style={{color: 'white', fontSize: '15px'}}>{t('Submit')}</h1>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

export default OtpForm;
