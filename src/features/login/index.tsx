import BrandLogo from "../../components/logo";
import UserForm from "../../components/user-form";
import OtpForm from "../../components/otp-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./index.css";

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
    <Container className="main-body">
      <BrandLogo />
      {showUserForm ? (
        <UserForm onSubmit={onSubmitForm} />
      ) : (
        <OtpForm onSubmit={onSubmit} />
      )}
    </Container>
  );
}

export default Login;
