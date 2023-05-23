import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header, Modal, Icon, Dimmer } from "semantic-ui-react";
import ambulanceIcon from "../../assets/ambulance.png";
import Call from "../../assets/phone-call.png";

const Ambulance = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["mydetails"]);

  const goBack = () => {
    navigate("/services");
  };

  return (
    <>
      <Dimmer active={true}>
        <div
          style={{
            background: "white",
            height: "50%",
            width: "320px",
            borderRadius: 30,
            marginBottom: "80%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "90%",
                borderRadius: "10px",
                marginLeft: "5%",
                marginTop: "2%",
              }}
            >
              <Modal.Description>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Header
                      style={{
                        marginLeft: "18%",
                        marginTop: "8%",
                        width: "60%",
                        height: "36px",
                        background: "#007cb0",
                        borderRadius: "10px",
                        textAlign: "center",
                      }}
                    >
                      <p style={{ paddingTop: "3%", color: "white" }}>
                        {t("Ambulance")}
                      </p>
                    </Header>
                    <div
                      style={{ flex: 1, marginTop: "11%", marginLeft: "6%" }}
                      onClick={goBack}
                    >
                      <Icon disabled name="close" color="black" size="large" />
                    </div>
                  </div>
                </div>
                <Modal.Actions>
                  <div style={{ flexDirection: "column", marginLeft: "4%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "4%",
                      }}
                    >
                      <div style={{ marginLeft: "20%", marginTop: "1%" }}>
                        <img src={ambulanceIcon} width={40} height={40} />
                      </div>
                      <p
                        style={{
                          paddingLeft: "5%",
                          fontSize: "110%",
                          color: "black",
                          fontWeight: "bold",
                          paddingTop: "4%",
                        }}
                      >
                        {t("Book Ambulance")}
                      </p>
                    </div>
                  </div>
                  <Modal.Actions style={{ marginLeft: "35%", marginTop: "4%" }}>
                    <div
                      style={{
                        background: "#E41B47",
                        width: "50%",
                        height: "40px",
                        borderRadius: "10px",
                        display: "flex",
                      }}
                    >
                      <img
                        src={Call}
                        width={22}
                        height={22}
                        style={{ marginLeft: "16%", marginTop: "10%" }}
                      />
                      <div style={{ marginTop: "12%" }}>
                        <a
                          href="tel:9618478765"
                          style={{
                            textDecoration: "none",
                            color: "white",
                            padding: "20%",
                            fontSize: "18px",
                          }}
                        >
                          {t("Call")}
                        </a>
                      </div>
                    </div>
                  </Modal.Actions>
                </Modal.Actions>
              </Modal.Description>
            </div>
          </div>
        </div>
      </Dimmer>
    </>
  );
};

export default Ambulance;
