import BrandLogo from "../../components/logo";
import UserForm from "../../components/user-form";
import OtpForm from "../../components/otp-form";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./index.css";
import MessageNotification from "../../common/notification";
import { useAppSelector, RootState } from "../../config/redux-store";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { status, user, message } = useAppSelector(
    (state: RootState) => state.user
  );

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
      <MessageNotification status={status} message={message} theme="dark" />
      <BrandLogo />
      {showUserForm ? <UserForm /> : <OtpForm onSubmit={onSubmit} />}
    </Container>
  );
}

export default Login;
