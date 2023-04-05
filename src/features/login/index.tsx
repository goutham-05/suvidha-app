import BrandLogo from "../../components/logo";
import UserForm from "../../components/user-form";
import OtpForm from "../../components/otp-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showUserForm, setShowUserForm] = useState(true);

  const onSubmitForm = (data: any) => {
    setShowUserForm(false);
  };

  const onSubmit = (data: any) => {
    navigate("/services");
  };

  return (
    <>
      <BrandLogo />
      {showUserForm ? (
        <UserForm onSubmit={onSubmitForm} />
      ) : (
        <OtpForm onSubmit={onSubmit} />
      )}
    </>
  );
}

export default Login;
