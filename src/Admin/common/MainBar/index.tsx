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
    <div className="container">
      <div className="addButton">
        <Link to="/qr-code-generation" className="link">
          <Button type="Add New" />
        </Link>
      </div>
      <div>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">ID</th>
            <th className="widgetLgTh">LINK</th>
          </tr>
          {Links.map((item) => {
            return (
              <tr className="widgetLgTr">
                <th className="widgetLgTh">{item.id}</th>
                <th className="widgetLgTh">{item.link}</th>
                <td className="widgetLgStatus">
                  <Button type="Delete" />
                </td>
                <td className="widgetLgStatus">
                  <Button type="Edit" />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default MainBar;
