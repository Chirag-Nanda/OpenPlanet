import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {BrowserRouter, Link , Route, Switch} from "react-router-dom";
import homeImage from "../../assets/home-img.png";
import Minter from "./Minter";
import Gallery from "./Gallery";
import CURRENT_USER_ID from "../index";
import { opend } from "../../../declarations/opend";


function Header() {
   const [items, setItems]=useState();
   const [listeditems, setListedItems]= useState();
  async function getNFTs(){
    const nftStorage = await opend.getOwnedNFTs(CURRENT_USER_ID);
    console.log(nftStorage);
    setItems(<Gallery title="My NFTs" ids={nftStorage} role={"collection"}/>);

    const listedIds = await opend.listedItems();
    setListedItems(<Gallery title="Discover" ids={listedIds} role={"discover"}/>)

  }

  useEffect(()=>{getNFTs();},[]);

  return (
    <BrowserRouter forceRefresh={true}>
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <img className="header-logo-11" src={logo} />
          <div className="header-vertical-9"></div>
          <h5 className="Typography-root header-logo-text"><Link to="/">OpenPlanet</Link></h5>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to="/discover">Discover</Link>  
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to="/minter">Minter</Link>  
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
          <Link to="/collections">My NFTs</Link>  
          </button>
        </div>
      </header>
    </div>
    <Switch>
      <Route exact path="/">
      <img className="bottom-space" src={homeImage} />
      </Route>
      <Route path="/discover">
        {listeditems}
      </Route>
      <Route path="/minter">
        <Minter/>
      </Route>
      <Route path="/collections">
        {items}
      </Route>
    </Switch>

    </BrowserRouter>
  );
}

export default Header;
