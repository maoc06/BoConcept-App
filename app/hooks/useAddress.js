import {useContext} from 'react';

import {AddressContext} from '../contexts/addressContext';

export default useAddress = () => {
  const {address, setAddress} = useContext(AddressContext);

  const setInitial = (initialAddress) => {
    setAddress(initialAddress);
  };

  const addAddress = (addressInfo) => {
    console.log('OLD', address);
    console.log('NEW', addressInfo);
    setAddress([...address, addressInfo]);
  };

  return {address, setInitial, addAddress};
};
