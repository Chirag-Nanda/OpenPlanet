import type { Principal } from '@dfinity/principal';
export interface NFT {
  'getName' : () => Promise<string>,
  'getObject' : () => Promise<Array<number>>,
  'getOwner' : () => Promise<Principal>,
  'getPrincipal' : () => Promise<Principal>,
  'transferNFTs' : (arg_0: Principal) => Promise<string>,
}
export interface _SERVICE extends NFT {}
