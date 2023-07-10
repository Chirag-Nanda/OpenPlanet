export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Service({
    'getName' : IDL.Func([], [IDL.Text], ['query']),
    'getObject' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'getPrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'transferNFTs' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
  return NFT;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Vec(IDL.Nat8)];
};
