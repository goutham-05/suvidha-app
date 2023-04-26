import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import DropDown from "../../../common/drop-down";

const languagesData = [
  { id: 1, value: "1", selected: false },
  { id: 2, value: "2", selected: false },
  { id: 3, value: "3", selected: false },
  { id: 4, value: "4", selected: false },
  { id: 5, value: "5", selected: false },
  { id: 6, value: "6", selected: false },
  { id: 7, value: "7", selected: false },
  { id: 8, value: "8", selected: false },
  { id: 9, value: "9", selected: false },
];

const floorData = [
    { id: 1, value: "floor-1", selected: false },
    { id: 2, value: "floor-2", selected: false },
    { id: 3, value: "floor-3", selected: false },
    { id: 4, value: "floor-4", selected: false },
  ];
function QrCodeGeneration() {
  const navigate = useNavigate();
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const [isFloorDropDownClicked, setFloorDropDownClicked] = useState(false);
  const [isBlockDropDownClicked, setBlockDropDownClicked] = useState(false);
  const [selected, setSelected] = useState("Select Unit");
  const [block, setBloack] = useState("Select Block");
  const [floor, setFloor] = useState("Select floor");

  const onSubmit = () => {
    setIsDropDownClicked(!isDropDownClicked);
    setFloorDropDownClicked(!isFloorDropDownClicked);
  };

  return (
    <div style={{marginTop: '150px'}}>
      <div className="dropdown" onClick={onSubmit}>
        <div className="dropdown-btn">
          {selected}
          <span className="fas fa-caret-down"></span>
        </div>
        {isDropDownClicked && (
          <div className="dropdown-content">
            {languagesData.map((item: any) => {
              return (
                <div
                  className="dropdown-item"
                  onClick={(e) => {
                    setSelected(item.value);
                    setIsDropDownClicked(false);
                  }}
                >
                  {item.value}
                  <div className="border-line" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="dropdown" onClick={onSubmit}>
        <div className="dropdown-btn">
          {block}
          <span className="fas fa-caret-down"></span>
        </div>
        {isDropDownClicked && (
          <div className="dropdown-content">
            {languagesData.map((item: any) => {
              return (
                <div
                  className="dropdown-item"
                  onClick={(e) => {
                    setSelected(item.value);
                    setIsDropDownClicked(false);
                  }}
                >
                  {item.value}
                  <div className="border-line" />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="dropdown" onClick={onSubmit}>
        <div className="dropdown-btn">
          {floor}
          <span className="fas fa-caret-down"></span>
        </div>
        {isFloorDropDownClicked && (
          <div className="dropdown-content">
            {floorData.map((item: any) => {
              return (
                <div
                  className="dropdown-item"
                  onClick={(e) => {
                    setFloor(item.value);
                    setIsDropDownClicked(false);
                  }}
                >
                  {item.value}
                  <div className="border-line" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default QrCodeGeneration;
