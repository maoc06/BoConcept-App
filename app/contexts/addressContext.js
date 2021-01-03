import React, {useState} from 'react';

export const AddressContext = React.createContext();

function addressContextProvider({children}) {
  const [address, setAddress] = useState([]);

  return (
    <AddressContext.Provider value={{address, setAddress}}>
      {children}
    </AddressContext.Provider>
  );
}

export default addressContextProvider;
