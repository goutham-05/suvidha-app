import {
  useNavigate,
  unstable_HistoryRouter,
  useLocation,
} from "react-router-dom";
import { Button, Grid, Form, Label } from "semantic-ui-react";

import { useForm } from "react-hook-form";
import CInput from "../../common/input";
import { getOtp } from "../../features/login/authSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";
import { useEffect, useState } from "react";
import axios from "axios";
interface Props {
  history: History;
}

const UserForm: React.FC<Props> = ({ history }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data } = useAppSelector((state: RootState) => state.user);
  console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login", {
        state: {
          user: data,
        },
      });
    }
  }, [status]);

  const onSubmitForm = (data: any) => {
    console.log('formData', data);
    dispatch(getOtp(data));
    localStorage.setItem('Login', JSON.stringify(data.mobile_number));
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Grid columns="equal" style={{marginTop: -80}}>
          <Grid.Row stretched>
            <Grid.Column>
              <CInput
                placeholder="Mobile Number / Email"
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
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column style={{color: 'red'}}>
              <CInput
                label="admissionno"
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
              <Button
                style={{
                  borderRadius: "100px",
                  padding: "10px",
                  border: "1px solid gray",
                  textAlign: "center",
                  fontWeight: "lighter",
                  fontSize: "1.4rem",
                  background: '#E41B47',
                }}
                type="submit"
                loading={false}
                color="red"
              >
                Get OTP
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       mobile_number:
    //       <input
    //         type="text"
    //         value={mobile_number}
    //         onChange={handlemobile_numberChange}
    //       />
    //     </label>
    //     <label>
    //       admissionno:
    //       <input
    //         type="admissionno"
    //         value={admissionno}
    //         onChange={handleadmissionnoChange}
    //       />
    //     </label>
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
};

export default UserForm;
