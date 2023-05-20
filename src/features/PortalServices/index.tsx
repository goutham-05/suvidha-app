// import React, { useState } from "react";
// import Navbar from "../../components/nav-bar";
// import { Icon } from "semantic-ui-react";
// import { useNavigate } from "react-router-dom";
// import BackgroundImage from "../../components/background";
// import { Loader } from "semantic-ui-react";

// function PortalService(props: any) {
//   const naviage = useNavigate();
//   const Back = () => {
//     naviage("/services");
//   };

//   const [isLoading, setIsLoading] = useState(false);

//   const bedNo = localStorage.getItem('patient_bed');
//   const ipNumber = localStorage.getItem('admissionno');
//   const patientName = localStorage.getItem('patient_name');
//   const remark = "ksuvidha";
//   const url = `https://cloud.dexgo.co/k-suvidha?remark=${remark}&patientName=${patientName}&bedNumber=${bedNo}&ipAddress=${ipNumber}`;
  
//   return (
//     <>
//       <Navbar />
//       {isLoading ? (
//   <Loader active={isLoading} inline="centered" />
// ) : (
//       <div>
//         <div
//           onClick={Back}
//           style={{ marginBottom: "10%", marginRight: "190%", marginTop: "10%" }}
//         >
//           <Icon disabled name="arrow left" size="large" />{" "}
//         </div>
//         <div style={{width: '100%', height: '100px', marginLeft: '2%'}}>
//         <iframe
//       title="my-iframe"
//       src={url}
//       width="100%"
//       height="500px"
//     />
//         </div>
//       </div>
// )}
//       <BackgroundImage />
//     </>
//   );
// }

// export default PortalService;

import React, { useState, useEffect } from "react";
import Navbar from "../../components/nav-bar";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../components/background";
import { Loader } from "semantic-ui-react";

function PortalService(props: any) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowIframe(true);
    }, 10000);

    setIsLoading(true);

    return () => clearTimeout(timer);
  }, []);

  const back = () => {
    navigate("/services");
  };

  const bedNo = localStorage.getItem("patient_bed");
  const BedNumber = bedNo === "null" ? '" "' : bedNo; 
  const ipNumber = localStorage.getItem("admissionno");
  const patientName = localStorage.getItem("patient_name");
  const remark = "Suvidha";
  const url = `https://cloud.dexgo.co/k-suvidha?remark=${remark}&patientName=${patientName}&bedNumber=${BedNumber}&ipAddress=${ipNumber}`;

  return (
    <>
      <Navbar />
        <>
          <div
            onClick={back}
            style={{ marginBottom: "10%", marginRight: "190%", marginTop: "10%" }}
          >
            <Icon disabled name="arrow left" size="large" />{" "}
          </div>

          <div style={{ width: "100%", height: "100px", marginLeft: "2%" }}>
          {isLoading ? (
        <Loader active={isLoading} inline="centered" style={{marginTop: '50%'}}/>
      ) : (
        <>
            {showIframe && (
              <iframe title="my-iframe" src={url} width="100%" height="500px" />
            )}
            </>
      )}
          </div>
  
        </>
      <BackgroundImage />
    </>
  );
}

export default PortalService;