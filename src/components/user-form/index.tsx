import { useNavigate, unstable_HistoryRouter, useLocation} from "react-router-dom";
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

const UserForm: React.FC<Props> = ({history}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, user } = useAppSelector((state: RootState) => state.user);
  // console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login", {
        state: {
          user: user,
        },
      });
    }
    console.log('userDat', user);
  }, [status]);

  // const [mobileNumber, setmobileNumber] = useState('');
  // const [admissionNum, setadmissionNum] = useState('');

  // const handlemobileNumberChange = (event: any) => {
  //   setmobileNumber(event.target.value);
  // };

  // const handleadmissionNumChange = (event: any) => {
  //   setadmissionNum(event.target.value);
  // };

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('http://10.20.100.179:4000/api/patient-login', {
  //       mobileNumber,
  //       admissionNum
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmitForm = (data: any) => {
    //localStorage.setItem('phone_email');
    dispatch(getOtp(data));
    console.log('Data', data);
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
                label="mobileNumber"
                required={true}
                size="large"
                error={errors["Mobile Number / Email"] ? true : false}
                fluid={true}
                loading={false}
                //style={{background: 'red'}}
              />
              {errors.mobileNumber?.type === "required" && (
                <Label color="orange" pointing prompt>
                  Mobile Number / Email is required
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column style={{color: 'red'}}>
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
  //   <div>
  //   <form onSubmit={handleSubmit}>
  //     <label>
  //       mobileNumber:
  //       <input type="text" value={mobileNumber} onChange={handlemobileNumberChange} />
  //     </label>
  //     <label>
  //       admissionNum:
  //       <input type="admissionNum" value={admissionNum} onChange={handleadmissionNumChange} />
  //     </label>
  //     <button type="submit">Login</button>
  //   </form>
  // </div>
  );
};

export default UserForm;
