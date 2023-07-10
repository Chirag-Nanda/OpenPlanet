export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'completePurchase' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Principal],
        [IDL.Text],
        [],
      ),
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'getItemPrice' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getOriginalOwnerId' : IDL.Func(
        [IDL.Principal],
        [IDL.Principal],
        ['query'],
      ),
    'getOwnedNFTs' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(IDL.Principal)],
        ['query'],
      ),
    'isListed' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'listItems' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
    'listedItems' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'mint' : IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
