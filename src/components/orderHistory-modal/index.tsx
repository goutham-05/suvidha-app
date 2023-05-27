import React from "react";
import Navbar from "../nav-bar";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";

function OrderHistory() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const orderList = useAppSelector((state) => state.orderHistory);

  const goBack = () => {
    navigate("/fnb");
  };

  return (
    <div>
      <Navbar />
      <div
        onClick={goBack}
        style={{ marginBottom: "5%", marginRight: "190%", marginTop: "6%" }}
      >
        <Icon disabled name="arrow left" size="large" />
        <div style={{ display: "flex", alignItems: "center" }}></div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "32%", border: "1px solid black" }} />
        <div
          style={{
            padding: "15px",
            whiteSpace: "nowrap",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          ITEM(S) IN HISTORY
        </div>
        <div style={{ width: "35%", border: "1px solid black" }} />
      </div>
      <div style={{marginLeft: '4%'}}>
        {orderList.data?.map((item: any, index: any) => (
          <div
            style={{
              width: "100%",
              height: "10%",
              borderRadius: "10px",
              border: "1px solid grey",
              padding: "10px",
              marginBottom: "4%",
              boxShadow: "0px 2px 4px grey",
              display:'flex'
            }}
          >
            <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "black",
                width: "200px",
                whiteSpace: "normal",
                textAlign: "left",
              }}
            >
              {item.items}
            </p>
            <p style={{marginRight: '160px',fontWeight: "bold",
                fontSize: "12px",}}>
              Remarks - {item.remarks}
            </p>
            </div>
            <div>
              <p>{item.dietorderid}</p>
              </div>
          </div>
        ))}
      </div>

      {/* <div

      >
        {orderList.data?.map((item: any, index: any) => (
          <div
            key={index}
            style={{
              width: "94%",
              height: "90px",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "4%",
              border: "1px solid grey",
              boxShadow: "0px 2px 4px grey",
              background: "white",
              marginLeft: "2%",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "10%",
                  height: "80px",
                  whiteSpace: "nowrap",
                }}
                key={item.itemid}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "black",
                    width: "200px",
                    whiteSpace: "normal",
                    textAlign: "left",
                  }}
                >
                  {item.items}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "black",
                    width: "200px",
                    whiteSpace: "normal",
                    textAlign: "left",
                  }}
                >
                  {item.orderid}
                </p>
              </div>
              <div style={{ marginLeft: "50%", position: "relative" }}>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "black",
                    width: "200px",
                    whiteSpace: "normal",
                    textAlign: "left",
                  }}
                >
                  {item.dietorderid}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default OrderHistory;
