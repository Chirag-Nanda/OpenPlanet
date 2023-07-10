import React, { useEffect, useState } from "react";
import Item from "./Item";

function Gallery(props) {
  const [items, setItems]=useState();
  console.log(props.ids);
  async function setNFTs(){
    if(props.ids !=undefined){
       setItems(
        props.ids.map((nftId)=><Item id={nftId} key={nftId.toText()} roles={props.role}/>)
       );
    }
  }

 useEffect(()=>{
    setNFTs();
  },[]);


  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">{props.title}</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">{items}</div>
          
        </div>
      </div>
    </div>
  );
}

export default Gallery;
