import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor class NFT (name: Text, owner: Principal, token : [Nat8])=this{
   private let userName = name;
   private var ownerId = owner;
   private let nftPicture = token;
   

   public query func getName() : async Text {
       return userName;
   };
   
   public query func getOwner() : async Principal {
       return ownerId;
   };
   
   public query func getObject() : async [Nat8] {
       return nftPicture;
   };

   public query func getPrincipal() : async Principal{
      return Principal.fromActor(this);
   };
   
   public shared(msg) func transferNFTs (newOwner : Principal) : async Text{
    if(msg.caller == ownerId){
      ownerId := newOwner;
      return "Success";
    }else{
         return "Err: Not Initiated By NFT Owner";
    }
   };

};