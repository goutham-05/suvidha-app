import { useNavigate } from "react-router-dom";
import { Button, Grid, Form, Label } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import CInput from "../../common/input";
import { getOtp } from "../../features/login/authSlice";
import { setDb } from "../../features/login/dbSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { useState, useEffect } from "react";
import BackgroundImage from "../background";
import Logo from "../../assets/Logo.png";
import localForage from "localforage";
import BrandLogo from "../logo";
import "./index.css";
import { Loader } from "semantic-ui-react";

interface Props {
  history?: History;
}

const UserForm: React.FC<Props> = ({ history }) => {
  const { t } = useTranslation(["login"]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, data: userData } = useAppSelector(
    (state: RootState) => state.user
  );

  const db = useAppSelector((state) => state.db.db);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function openDatabase() {
    const config = {
      name: "ksuvidha",
      version: 1,
      storeName: "checkotp",
      description: "My store with auto-incrementing IDs",
      autoIncrement: true,
    };
    const database = await localForage.createInstance(config);
    dispatch(setDb(database));
  }
  
  useEffect(() => {
    if (userData) {
      openDatabase();
    }
  }, [status]);

  useEffect(() => {
    addData(userData);
  }, [db, userData]);

  async function addData(userData: any) {
    try {
      await db.setItem(userData.ip_no, userData.otp);
      console.log("Data added to store");
    } catch (error) {
      console.log("Error adding data to store", error);
    }
  }

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login", {
        state: {
          user: userData,
        },
      });
      localStorage.setItem("patient_name", userData.patient_name);
      console.log("Bed Number", userData.patient_name);
      localStorage.setItem("patient_bed", userData.bed_no);
      localStorage.setItem("patient_room", userData.room_no);
      localStorage.setItem("patient_floor", userData.floor);
      localStorage.setItem("patient_wardName", userData.ward_name);
      localStorage.setItem("patient_type", userData.patient_type);
    }
  }, [status]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (data: any) => {
    setIsLoading(true);
    const unitCodeStr = localStorage.getItem("unit_code");
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      data.unit_id = unit_code.unit;
    }
    await dispatch(getOtp(data));
    localStorage.setItem("mobile_number", data.mobile_number);
    setIsLoading(false);
  };

  return (
    <>
      <img src={Logo} width={150} height={150} />
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <div style={{ width: "auto", marginLeft: "-4%" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "grey",
              whiteSpace: "nowrap",
            }}
          >
            {t("login_text")}
          </span>
        </div>
        <Grid
          columns="equal"
          style={{ marginTop: "1%", justifyContent: "center" }}
        >
          <Grid.Row stretched>
            <Grid.Column
              style={{
                fontSize: "1.2rem",
                maxWidth: "340px",
                width: "100%",
                margin: "0 auto",
                padding: "1rem",
              }}
            >
              <CInput
                placeholder={t("mobileNumber")}
                register={register}
                label="mobile_number"
                required={true}
                size="large"
                error={errors["Mobile Number"] ? true : false}
                fluid={true}
                loading={false}
                type="text"
                minLength={8}
                maxLength={10}
              />
              {errors.mobile_number?.type === "required" && (
                <Label color="orange" pointing prompt>
                  {t("mobile_number_required")}
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              {isLoading ? (
                <Loader active={isLoading} inline="centered" />
              ) : (
                <Button
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
                  type="submit"
                  loading={false}
                  color="red"
                >
                  {t("login:GetOTP")}
                </Button>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <BackgroundImage />
    </>
  );
};

export default UserForm;
