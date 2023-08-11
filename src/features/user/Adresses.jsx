import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { useEffect, useRef, useState } from 'react';
import {
  createAddress,
  deleteAddress,
  getCurrentUserAddresses,
} from '../../services/apiUser';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, deleteUserAddress } from '../user/userSlice';

function Adresses() {
  const cityRef = useRef(null);
  const addressRef = useRef(null);
  const postcodeRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    const newAddress = {
      phone: user.phone,
      address: addressRef.current.value,
      city: cityRef.current.value,
      postcode: postcodeRef.current.value,
      tag: 'home',
    };

    dispatch(addAddress(newAddress));
    createAddress(newAddress);
  }

  function handleDelete(id) {
    dispatch(deleteUserAddress({ id }));
    deleteAddress({ id });
  }

  return (
    <div>
      <h2 className="font-header text-2xl text-stone-700 2xl:text-3xl">
        Your saved adresses
      </h2>

      <ul className="my-6 space-y-4">
        {user.addresses.map((address, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-6 font-primary text-stone-500"
          >
            <p>{`${address.address}, ${address.city}, ${address.postcode}`}</p>
            <div className="space-x-3">
              <button onClick={() => handleDelete(address.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <hr></hr>
      <div className="mt-6 flex items-center gap-2 font-primary text-orange-500">
        <p>Add new address</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 w-full space-y-2 sm:w-1/2">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <input
            className="input grow"
            placeholder="City"
            name="city"
            ref={cityRef}
          ></input>
          <input
            className="input grow"
            placeholder="ZIP"
            name="postcode"
            ref={postcodeRef}
          ></input>
        </div>
        <input
          className="input w-full"
          placeholder="Address"
          name="address"
          ref={addressRef}
        ></input>
        <Button fullWidth={true}>Save</Button>
      </form>
    </div>
  );
}

export default Adresses;
