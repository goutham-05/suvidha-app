import React, { useState, useEffect } from "react";
import KLogo from "../../assets/kimslogo.png";
import "./index.css";
import QRCode from "qrcode";
import MessageNotification from "../../common/notification";
import { getUnits } from "../../reduxtoolkit/unitSlice";
import { storQRCode } from "../../reduxtoolkit/qrCodeSlice";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../config/redux-store";

function QrCode() {
  const dispatch = useAppDispatch();
  const { status, data, message } = useAppSelector((state) => state.units);
  const { status:qrCStatus, data:qrCData, message:qrCMessage } = useAppSelector((state) => state.qrCode);
  const [qrCodeData, setQRCodeData] = useState("");
  console.log('qrCMessage::', qrCMessage);
  useEffect(() => {
    dispatch(getUnits({}));
  }, []);
  const [formData, setFormData] = useState<FormData>({
    unit_name: "",
    qr_code_data: "https://ksuvidha.kimshospitals.com",
    unit_code: "",
  });
  interface FormData {
    unit_name: string;
    unit_code: string;
    qr_code_data: string;
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLSelectElement) {
      const selectedOption = e.target.options[e.target.selectedIndex].text;
      setFormData({ ...formData, [name]: value, unit_name: selectedOption });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const ksUrl = formData.qr_code_data + "/" + formData.unit_code;
      const qrCodeDataUrl = await QRCode.toDataURL(ksUrl);
      setQRCodeData(qrCodeDataUrl);
      dispatch(storQRCode({
        unit_name: formData.unit_name,
        unit_code: formData.unit_code,
        ks_url: ksUrl,
        qr_code: qrCodeDataUrl,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      { qrCMessage && (<MessageNotification status={qrCStatus} message={qrCMessage} theme="dark" />)}
      <form onSubmit={handleSubmit}>
        <div>
          <small>Please enter Unit Name:</small>
          <select
            name="unit_code"
            onChange={handleInputChange}
            required
          >
            <option value="">Select a unit...</option>
            {data &&
              data.map((unit: any) => (
                <option key={unit.id} value={unit.unit_admin_id}>
                  {unit.unitname}
                </option>
              ))}
          </select>
        </div>
        <div>
          <small>Generate QRCode with bellow URL:</small>
          <input
            type="text"
            name="qr_code_data"
            onChange={handleInputChange}
            placeholder="https://example.com"
            //pattern="^(https?:\/\/)?[\da-z\.-]+\.[a-z\.]{2,6}[\/\w\.-]*[\/]?$/"
            defaultValue={"https://ksuvidha.kimshospitals.com"}
            required
            readOnly
          />
        </div>
        <div style={{ width: "100%" }}>
          <button type="submit">GENERATE</button>
        </div>
      </form>
      <nav className="navbar">
        <img src={KLogo} alt="Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li>
            <a href="#">{formData.unit_name}</a>
          </li>
          <li>
            <a href="#">{formData.unit_code}</a>
          </li>
        </ul>
      </nav>
      <div style={{ width: "100%" }}>
        <p style={{ fontSize: "12px", fontWeight: 900 }}>
          PLEASE SCAN THIS QR CODE FOR FEEDBACK / SERVICES / COMPLAINTS
        </p>
      </div>
      <div>
        {/* <img src={QRCODE} style={{marginTop: '30px'}}/> */}
        {qrCodeData && (
          <img src={qrCodeData} alt="QR Code" style={{ marginTop: "30px" }} />
        )}
        <div style={{ width: "100%" }}>
          <p
            style={{ fontSize: "12px", fontWeight: "bold", marginTop: "20px" }}
          >
            फीडबैक/सेवाओं/शिकायतों के लिए कृपया इस क्यूआर कोड को स्कैन करें
          </p>
        </div>
      </div>
    </div>
  );
}

export default QrCode;
