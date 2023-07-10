import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'completePurchase' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: Principal,
    ) => Promise<string>,
  'getCanisterId' : () => Promise<Principal>,
  'getItemPrice' : (arg_0: Principal) => Promise<bigint>,
  'getOriginalOwnerId' : (arg_0: Principal) => Promise<Principal>,
  'getOwnedNFTs' : (arg_0: Principal) => Promise<Array<Principal>>,
  'isListed' : (arg_0: Principal) => Promise<boolean>,
  'listItems' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
  'listedItems' : () => Promise<Array<Principal>>,
  'mint' : (arg_0: string, arg_1: Array<number>) => Promise<Principal>,
}
