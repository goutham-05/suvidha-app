import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

const Links = [
  {
    id: 1,
    link: "https://link-1",
  },
  {
    id: 2,
    link: "https://link-1",
  },
  {
    id: 3,
    link: "https://link-1",
  },
  {
    id: 4,
    link: "https://link-1",
  },
  {
    id: 5,
    link: "https://link-1",
  },
];
function MainBar() {
  const Button = ({ type }: any) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    // <div className="widgetLg">
    //   <div className="addButton">
    //     <Button type="Add New" />
    //   </div>
    //   <h3 className="widgetLgTitle">QR Lists</h3>
    //   <table className="widgetLgTable">
    //     <tr className="widgetLgTr">
    //       <th className="widgetLgTh">ID</th>
    //       <th className="widgetLgTh">LINK</th>
    //     </tr>
    //     {Links.map((item) => {
    //       return (
    //         <tr className="widgetLgTr">
    //           <th className="widgetLgTh">{item.id}</th>
    //           <th className="widgetLgTh">{item.link}</th>
    //           <td className="widgetLgStatus">
    //         <Button type="Delete" />
    //       </td>
    //       <td className="widgetLgStatus">
    //         <Button type="Edit" />
    //       </td>
    //         </tr>
    //       );
    //     })}
    //     {/* <tr className="widgetLgTr">
    //       <th className="widgetLgTh">ID</th>
    //       <th className="widgetLgTh">LINK</th>
    //     </tr>
    //     <tr className="widgetLgTr">
    //       <td className="widgetLgUser">
    //         <span className="widgetLgName">Federico Kereki</span>
    //       </td>
    //       <td className="widgetLgDate">14 May 2022</td>
    //       <td className="widgetLgAmount">$2100.00</td>
    //       <td className="widgetLgStatus">
    //         <Button type="Approved" />
    //       </td>
    //     </tr>
    //     <tr className="widgetLgTr">
    //       <td className="widgetLgUser">
    //         <span className="widgetLgName">Ikechi Fortune</span>
    //       </td>
    //       <td className="widgetLgDate">12 May 2022</td>
    //       <td className="widgetLgAmount">$1202.00</td>
    //       <td className="widgetLgStatus">
    //         <Button type="Declined" />
    //       </td>
    //     </tr> */}
    //   </table>
    // </div>
    <div className="box2">
      <div className="widgetLg">
        <div className="addButton">
          <Button type="Add New" />
        </div>
      </div>
    </div>
  );
}

export default MainBar;
