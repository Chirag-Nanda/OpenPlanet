import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";
function App() {
 // const canisterId ="rrkah-fqaaa-aaaaa-aaaaq-cai";
  return (
    <div className="App">
      <Header />
      
      
      {/*<Item id ={canisterId}/>*/}
     
      <Footer />
    </div>
  );
}

export default App;
