
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";


actor OpenD {
private type Listing ={
   itemOwner : Principal;
   itemPrice : Nat;
 };

 let  mapofNFTs = HashMap.HashMap<Principal , NFTActorClass.NFT>(1,Principal.equal,Principal.hash); 
 let  mapOfOwners = HashMap.HashMap<Principal , List.List<Principal>>(1,Principal.equal,Principal.hash);
 let  mapOfListings = HashMap.HashMap<Principal , Listing>(1, Principal.equal, Principal.hash);

 public shared(msg) func mint(name : Text , image : [Nat8]): async Principal{
   let owner: Principal = msg.caller;
   Debug.print(debug_show(Cycles.balance()));
    Cycles.add(100_500_000_000);
   let newActor = await NFTActorClass.NFT(name, owner, image);
   let newPrincipal = await newActor.getPrincipal();
   mapofNFTs.put(newPrincipal , newActor);
   addToOwnershipMap(owner, newPrincipal);
   Debug.print("Success");
    Debug.print(debug_show(Cycles.balance()));
   return newPrincipal;
 }; 
 
 private func addToOwnershipMap(owner: Principal , nftId: Principal){
    var ownerNFTs : List.List<Principal> = switch(mapOfOwners.get(owner)){
        case null List.nil<Principal>();
        case (?result) result;
    };
    
     ownerNFTs := List.push(nftId , ownerNFTs);
      
      mapOfOwners.put(owner, ownerNFTs);

 };

 public query func getOwnedNFTs(user: Principal) : async [Principal]{
   var userNFTs: List.List<Principal> = switch(mapOfOwners.get(user)) {
       case null List.nil<Principal>();
       case (?result) result;
   };
   
   return List.toArray(userNFTs);
 };
 
 public shared(msg) func listItems(itemId:Principal , price: Nat): async Text{
   var nftItems : NFTActorClass.NFT = switch(mapofNFTs.get(itemId)){
     case null return ("NFT not found");
     case (?result) result;
   };

   let owner = await nftItems.getOwner();

   if(Principal.equal(owner, msg.caller)){
      let newListings : Listing = {
         itemOwner = owner;
         itemPrice = price;
      };
      mapOfListings.put(itemId , newListings);
      return "Success";
   }else{
     return "Not your NFTs";
   }

 };

 public query func listedItems(): async [Principal]{
    let ids = Iter.toArray(mapOfListings.keys());
    return ids;
 };

 public query func getCanisterId(): async Principal{
  return Principal.fromActor(OpenD);
 };
 
 public query func isListed(itemId: Principal) : async Bool{
  if(mapOfListings.get(itemId) == null){
    return false;
  }
  else{
    return true;
  }
 };
 
 public query func getOriginalOwnerId(itemId: Principal): async Principal{
   var listing: Listing = switch(mapOfListings.get(itemId)){
     case null return Principal.fromText("");
     case (?result) result;
   }; 

   return listing.itemOwner;
 };

 public query func getItemPrice(itemId: Principal): async Nat{
 var listing: Listing = switch(mapOfListings.get(itemId)){
     case null return 0;
     case (?result) result;
   }; 

   return listing.itemPrice;
 };

 public shared(msg) func completePurchase(itemId : Principal, ownerId : Principal , newOwner : Principal): async Text{
   let purchasedNFT : NFTActorClass.NFT = switch(mapofNFTs.get(itemId)){
    case null return "NFT doesn't exist";
    case (?result) result;
   };
    
   let transferResult = await purchasedNFT.transferNFTs(newOwner);
   if(transferResult == "Success"){
    mapOfListings.delete(itemId);
    var nftListing : List.List<Principal> = switch(mapOfOwners.get(ownerId)){
      case null List.nil<Principal>();
      case (?result) result;
    };

     nftListing := List.filter(nftListing , func(listItemId : Principal): Bool{
      return listItemId != itemId;
    });
    addToOwnershipMap(newOwner , itemId);

   return "Success";
   }else{
    return "Error";
   }

   
 };

};
