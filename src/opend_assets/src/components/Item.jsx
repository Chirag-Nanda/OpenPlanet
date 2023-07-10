import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Principal } from "@dfinity/principal"; 
import {Actor,HttpAgent} from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { idlFactory as tokenidlFactory} from "../../../declarations/token";
import { opend } from "../../../declarations/opend";
import Button from "./Button";
import CURRENT_USER_ID from "../index";
import PriceLabel from "./Pricelabel";


function Item(props) {
  const [name,setName]= useState();
  const [owner, setOwner]= useState();
  const [image, setImage]= useState();
  const [button, setButton]= useState();
  const [input, setInput]= useState();
  const [loaderHidden , setLoaderHidden]= useState(true);
  const [blur , setBlur]= useState();
  const [text , setText]= useState();
  const [priceLabel, setPriceLabel]=useState();
  const [shouldDisplay ,setDisplay] =useState(true);
  const id =props.id;
  
  const  localHost = "http://localhost:8080/";
  const  agent = new HttpAgent({host: localHost});
  //When Deploying Live remove the line fetchRootKey
  agent.fetchRootKey();
  let NFTActor;
  async  function loadNFT(){
     NFTActor = await Actor.createActor(idlFactory,{
      agent,
      canisterId : id,

    });

    const nftName=await NFTActor.getName();
    console.log(nftName);
    setName(nftName);

    const nftOwner= await NFTActor.getOwner();
    setOwner(nftOwner.toString());

    const imageData = await NFTActor.getObject();
    const imageObject = new Uint8Array(imageData);
    const imageURL = URL.createObjectURL(
      new Blob([imageObject.buffer], {type: "image/png"}) 
    );
    setImage(imageURL);
    
    if(props.roles == "collection"){
    const nftListed = await opend.isListed(props.id);
    
    if(nftListed){
      setBlur({filter: "blur(4px)"});
      setOwner("OpenPlanet");
      setText("Listed");
    }else{
      setButton(<Button handleClick={handleSell} text={"Sell"}/>);
    }
   
  }
   
  else if (props.roles == "discover"){
    const originalOwner = await opend.getOriginalOwnerId(props.id);
    if(originalOwner.toText() != CURRENT_USER_ID.toText()){
     
    setButton(<Button handleClick={handleBuy} text={"Buy"}/>);}
    const cost = await opend.getItemPrice(props.id);
    setPriceLabel(<PriceLabel price={cost.toString()}/>);
  }

    
  };

  useEffect(()=>{
    loadNFT();
  },[]);

  let price;
  async function handleSell(){
  setInput(
    <input
    placeholder="Price in MUDRA"
    type="number"
    className="price-input"
    value={price}
    onChange={(e)=>{price=e.target.value}}
  />
  );

  setButton(<Button handleClick={sellItems} text={"Confirm"}/>);
  }


  async function sellItems(){
    setBlur({filter: "blur(4px)"});
    setLoaderHidden(false);
    console.log("sell price = "+ price);
    const listResponse = await opend.listItems(props.id , Number(price));
    const openid = await opend.getCanisterId();
    const deployResult = await NFTActor.transferNFTs(openid);
    console.log("listing: "+ listResponse);
    console.log("transfer: "+ deployResult );
    if(deployResult == "Success"){
      setLoaderHidden(true);
      setButton();
      setInput();
      setOwner("OpenPlanet");
    }

  }


  async function handleBuy(){
    console.log("Bought");
    setLoaderHidden(false);
    const tokenActor = await Actor.createActor(tokenidlFactory,{
      agent,
      canisterId : Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
    });
    const sellerId = await opend.getOriginalOwnerId(props.id);
    const itemPrice =await opend.getItemPrice(props.id);

    const result = await tokenActor.transfer(sellerId , itemPrice);
    console.log(result);
    if(result == "Success"){
     const purchaseResult = await  opend.completePurchase(props.id , sellerId , CURRENT_USER_ID);
     console.log(purchaseResult);
     setLoaderHidden(true);
     setDisplay(false);
    }
  }


  return (
    <div style={{display : shouldDisplay?"inline" :"none"}} className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image} style={blur}
        />
         <div className="lds-ellipsis" hidden={loaderHidden}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

        <div className="disCardContent-root">
        {priceLabel}
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"> {text}</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
          {input}
          {button}
        </div>
      </div>
    </div>
  );
}

export default Item;
