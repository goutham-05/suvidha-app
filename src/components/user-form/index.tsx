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

import localForage from 'localforage';

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
      name: 'ksuvidha',
      version: 1,
      storeName: 'checkotp',
      description: 'My store with auto-incrementing IDs',
      autoIncrement: true
    };
    const database = await localForage.createInstance(config);
    dispatch(setDb(database));
  }
  useEffect(() => {
    if(userData){
      openDatabase();
    }
  }, [status]);
  useEffect(() => {
    addData(userData);
  }, [db, userData]);

  async function addData(userData:any) {
    try {
      await db.setItem(userData.ip_no, userData.otp);
      console.log('Data added to store');
    } catch (error) {
      console.log('Error adding data to store', error);
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
      localStorage.setItem("patient_bed", userData.bed_no);
      localStorage.setItem("patient_room", userData.room_no);
      localStorage.setItem("patient_floor", userData.floor);
      localStorage.setItem("patient_wardName", userData.ward_name);
      localStorage.setItem("patient_type", userData.patient_type);
    }
  }, [status]);

  const onSubmitForm = (data: any) => {
    const unitCodeStr = localStorage.getItem('unit_code');
    const unit_code = unitCodeStr ? JSON.parse(unitCodeStr) : null;
    if (unit_code) {
      data.unit_id = unit_code.unit;
    }
    dispatch(getOtp(data));
    localStorage.setItem("admissionno", data.admissionno);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid columns="equal" style={{marginTop: '-30%', justifyContent: 'center'}}>
          {/* <Grid.Row stretched>
            <Grid.Column>
              <CInput
                placeholder={t('login:mobileNumber')}
                register={register}
                label="mobile_number"
                required={true}
                size="large"
                error={errors["Mobile Number / Email"] ? true : false}
                fluid={true}
                loading={false}
                //style={{background: 'red'}}
              />
              {errors.mobile_number?.type === "required" && (
                <Label color="orange" pointing prompt>
                  Mobile Number / Email is required
                </Label>
              )}
            </Grid.Column>
          </Grid.Row> */}
          <Grid.Row stretched>
            <Grid.Column style={{ color: "red" }}>
              <CInput
                label="admissionno"
                placeholder={t('login:IpNumber')}
                register={register}
                required={true}
                size="large"
                error={errors["IP Number"] ? true : false}
                fluid={true}
                loading={false}
              />
              {errors.admissionno?.type === "required" && (
                <Label color="orange" pointing prompt>
                  IP Number is required
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Button
                style={{
                  borderRadius: "100px",
                  padding: "10%",
                  textAlign: "center",
                  fontWeight: "lighter",
                  fontSize: "1.4rem",
                  background: "#0075ad",
                  width: "100%",
                  marginLeft: '4%'
                }}
                type="submit"
                loading={false}
                color="red"
              >
               {t('login:GetOTP')}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <BackgroundImage />
    </>
  );
};

export default UserForm;
