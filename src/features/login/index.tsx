import BrandLogo from "../../components/logo";
import UserForm from "../../components/user-form";
import OtpForm from "../../components/otp-form";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./index.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showUserForm, setShowUserForm] = useState(true);

  const onSubmit = () => {
    navigate("/services");
  };

  useEffect(() => {
    if (location?.state?.user) {
      setShowUserForm(false);
      navigate(location.pathname, {
        state: {
          user: null,
        },
      });
    }
  }, [location.state?.user]);

  return (
    <Container>
      <BrandLogo />
      {showUserForm ? <UserForm /> : <OtpForm onSubmit={onSubmit} />}
    </Container>
  );
}

export default Login;
