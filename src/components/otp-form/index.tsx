import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Grid, Form, Message, Label } from "semantic-ui-react";
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
import MessageNotification from "../../common/notification";
import Logo from "../../assets/Logo.png";
import BackgroundImage from "../background";
import "./index.css";
import { Loader } from "semantic-ui-react";

interface Props {}

function formatMobileNumber(getMobile: any) {
  const visibleDigits = 4;
  const hiddenDigits = getMobile.length - visibleDigits;
  const firstDigits = getMobile.substring(0, hiddenDigits);
  const lastDigits = getMobile.substring(hiddenDigits);
  const hiddenNumbers = "*".repeat(hiddenDigits);
  return `${hiddenNumbers}${lastDigits}`;
}

const OtpForm: React.FC<Props> = ({}) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["otp"]);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "failed" | "succeeded"
  >("idle");

  const { otpSuccess, data: userData } = useAppSelector(
    (state: RootState) => state.user
  );

  localStorage.setItem("admissionno", userData.ip_no);
  const getMobile = localStorage.getItem("mobile_number");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mobile, setMobile] = useState("");
  const [ipNumber, setIpNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "succeeded" && otpSuccess) {
      navigate("/services");
    }
  }, [status, otpSuccess]);

  const db = useAppSelector((state) => state.db.db);
  async function addData(userData: any) {
    try {
      await db.setItem(userData.ip_no, userData.otp);
      console.log("Data added to store");
    } catch (error) {
      console.log("Error adding data to store", error);
    }
  }
  const onSubmitForm = async (data: any) => {
    setIsLoading(true);
    setStatus("idle");
    const otp = await db.getItem(userData.ip_no);
    if (otp === null || otp != data.otp) {
      setMessage("Invalid OTP");
      setStatus("failed");
      setIsLoading(false);
    } else {
      const otp = await db.setItem("token", userData.token);
      localStorage.setItem("token", userData.token);
      navigate("/services");
      setIsLoading(true);
    }
  };

  let unit_id = "";
  const unitCodeStr = localStorage.getItem("unit_code");
  const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
  if (unit_code) {
    unit_id = unit_code.unit;
  }
  const resendOTP = async() => {
    //setIsLoading(true);
    await dispatch(
      getOtp({
        mobile_number: localStorage.getItem("mobile_number"),
        unit_id: unit_id,
      })
    );
    //setIsLoading(false);
  };

  useEffect(() => {
    addData(userData);
  }, [db, userData]);
  const formattedNumber = formatMobileNumber(getMobile);

  return (
    <>
      <div style={{ marginTop: "4%" }}>
        <img src={Logo} width={150} height={150} />
      </div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <MessageNotification message={message} status={status} theme="dark" />
        <Message
          style={{
            fontSize: "1.2rem",
            maxWidth: "340px",
            width: "100%",
            margin: "0 auto",
            padding: "1rem",
          }}
        >
          <Message.Header
            style={{
              color: "#374F4F",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {t("Enter OTP sent to")} {formattedNumber}
          </Message.Header>
        </Message>

        <Form
          onSubmit={handleSubmit(onSubmitForm)}
          style={{
            fontSize: "1.2rem",
            maxWidth: "340px",
            width: "100%",
            margin: "0 auto",
            padding: "1rem",
          }}
        >
          <CInput
            placeholder={t("Enter OTP")}
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

          <div  style={{
              width: "25%",
              height: "25px",
              padding: "3px",
              fontSize: "13px",
              whiteSpace: "nowrap",
              marginLeft: '12%'
            }}>
              Didn't receive a OTP?<span style={{textDecoration: 'underline', padding:'5px', fontWeight: 'bold', color: '#0075AD'}} onClick={resendOTP}>Resend OTP</span>
          </div>
          {
            isLoading ? (
              <Loader active={isLoading} inline="centered" />
            ) : (
          <Button
            type="submit"
            loading={false}
            style={{
              borderRadius: "100px",
              textAlign: "center",
              fontWeight: "lighter",
              fontSize: "1.4rem",
              background: "#0075ad",
              width: "100%",
              maxWidth: "300px", // set a maximum width for the button
              margin: "0 auto", // center the button horizontally
            }}
          >
            <h1 style={{ color: "white", fontSize: "1.2rem" }}>
              {t("Submit")}
            </h1>
          </Button>)
}
        </Form>
        <BackgroundImage />
      </div>
    </>
  );
};

export default OtpForm;

{
  /* <Form onSubmit={handleSubmit(onSubmitForm)} style={{ marginLeft: "10%" }}>
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
              <Button
                type="submit"
                loading={false}
                style={{ background: "#0075ad", width: "100%" }}
              >
                <h1 style={{ color: "white", fontSize: "15px" }}>
                  {t("Submit")}
                </h1>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form> */
}
