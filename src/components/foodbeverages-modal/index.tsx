import React, { useState } from "react";
import Navbar from "../nav-bar";
import { Icon, Input } from "semantic-ui-react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import veg from '../../assets/fb/vegbiryani.webp';
import juice from '../../assets/fb/orangejuice.jfif';
import coffee from '../../assets/fb/coffee.jfif';
import chicken from '../../assets/fb/chibiryani.jfif';

const data = [
  {
    title: 'All',
    category: 'All',
  },
  {
    title: 'Veg',
    category: 'Veg',
  },
  {
    title: 'Jain'
  },
  {
    title:'Non Veg',
    category: 'Non Veg'
  },
  {
    title:'Bestseller'
  },
  {
    title:'Drinks & Juices',
    category: 'Drinks',
  }
];

const foodData = [
  {
    title :'Veg Biryani',
    rate:'$120.00',
    image: veg,
    category: 'Veg'
  }, 
  {
    title: 'Orange Juice',
    rate:'$85.00',
    image: juice,
    category: 'Drinks'
  },
  {
    title: 'Coffe',
    rate:'$40.00',
    image: coffee,
    category: 'Drinks'
  },
  {
    title :'Chicken Biryani',
    rate:'$120.00',
    image: chicken,
    category: 'Non Veg'
  }
]

function FoodBeverages() {

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/service")
  }

  const [selectCat, setSelectCat] = useState("All");

  const filteredData =
  selectCat === "All"
    ? foodData
    : foodData.filter((item) => item.category === selectCat);

  const selectCategory = (category: any) => {
      setSelectCat(category)
  }

  return (
    <div style={{ marginTop: "4%" }}>
      <Navbar />
      <div onClick={goBack} style={{ marginBottom: "5%", marginRight: "190%", marginTop: "6%" }}>
        <Icon disabled name="arrow left" size="large" />
      </div>
      <div
        style={{display: "flex", justifyContent: "center"}}
      >
        <div style={{ position: "relative", width: "100%", height: "50px" }}>
          <input
            type="text"
            placeholder="Search Menu"
            style={{
              width: "95%",
              height: "70%",
              borderRadius: "10px",
              background: "#D3D3D3",
              border: "none",
            }}
          />
          <i
            className="search icon"
            style={{
              position: "absolute",
              top: "30%",
              left: "240px",
              transform: "translateY(-50%)",
              fontSize: "15px",
              color: "black",
            }}
          ></i>
        </div>
        <div
          style={{
            marginLeft: "5%",
            background: "#0075ad",
            width: "15%",
            height: "32px",
            borderRadius: "20%",
            marginTop: "0.1%",
          }}
        >
          <Icon
            name="cart"
            size="large"
            inverted
            color="grey"
            style={{ marginTop: "12%" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "nowrap", width: "100%", marginLeft: '2%', marginTop: '5%'}}>
  {data.map((item, index) => (
    <div
      key={index}
      style={{
        marginRight: "20px",
        width: "100%",
        height: "20px",
        padding: "3px",
        fontSize: "10px",
        background: "white",
        boxShadow: "0px 2px 4px grey",
        borderRadius: "10px",
        whiteSpace: 'nowrap'
      }}>
        <div onClick={() => selectCategory(item.category)}>
      {item.title}
      </div>
    </div>
  ))}
</div>
<div style={{marginTop: '10%',}}>
      {
        filteredData.map((item, index) => (
          <div
          key={index}
          style={{
           width: '92%',
           height: '100px',
           padding: '10px',
           borderRadius: '10px',
           margin: '5%',
           border: '1px solid grey',
           boxShadow: "0px 2px 4px grey",
          }}
        >
          <div style={{display: 'flex'}}>
            <div style={{width: '10%', height: '80px', whiteSpace: 'nowrap'}}>
            <p style={{fontWeight: 'bold', fontSize: '18px', float: 'left'}}>{item.title}</p>
          <p style={{float:'left'}}>{item.rate}</p>
            </div>
            <div style={{width: '40%', height: '80px', marginLeft: '60%',}}>
            <img src={item.image} width={90} height={70} style={{ borderRadius: '20px'}}/>
            </div>
          </div>
          
         {/* <div style={{ width: '20%', marginTop: '4%', whiteSpace: 'nowrap', border: '1px solid grey'}}>
          <p style={{fontWeight: 'bold', fontSize: '18px', float: 'left'}}>{item.title}</p>
          <p style={{float:'left'}}>{item.rate}</p> */}
          {/* <img src={item.image}  style={{width: '100%', height: '20px', marginLeft: '100px'}}/> */}
         {/* </div>
         <div style={{width: '10%', height: '50px', background: 'red', float: 'right'}}/> */}
        </div>
        ))
      }
</div>
    </div>
  );
}

export default FoodBeverages;
