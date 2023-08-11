import { useEffect, useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { formatCurrency, isValidPhone } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import OrderCartItem from './OrderCartItem';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';
import { AddressAutofill } from '@mapbox/search-js-react';
import { createUser as createUserDb } from '../../services/apiUser';
const mapKey = import.meta.env.VITE_MAPBOX_TOKEN;

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const {
    userId,
    username,
    phone,
    status: addressStatus,
    position,
    city,
    postcode,
    address,
  } = useSelector((state) => state.user);

  const isLoading = addressStatus === 'loading';

  const cart = useSelector((state) => state.cart.cart);
  const cartTotalPrice = useSelector(getTotalCartPrice);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const formErrors = useActionData();

  const priorityPrice = withPriority ? cartTotalPrice * 0.2 : 0;

  const isSubmitting = navigation.state === 'submitting';

  function handleGetGeo(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart></EmptyCart>;

  return (
    <div className="w-full 2xl:px-32 min-[1757px]:px-64">
      {/* <Form method="POST" action="/order/new"> */}
      <Form
        method="POST"
        action=""
        className="flex  flex-col justify-between gap-4 min-[871px]:flex-row min-[871px]:items-start min-[871px]:gap-16 "
      >
        {/* left part */}
        <div className="my-4  space-y-4 sm:space-y-6 md:grow">
          <h1 className=" font-header text-xl text-stone-700 sm:text-3xl">
            New delivery order
          </h1>
          <div className="rounded-md p-4 shadow-lg">
            <h2 className="text-md py-2 font-header text-stone-700 sm:text-xl">
              Contact data
            </h2>
            <div className=" flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                placeholder="Name"
                type="text"
                name="customer"
                required
                className="input"
                defaultValue={username}
              />
              <input
                placeholder="Phone number"
                type="tel"
                name="phone"
                required
                className="input "
                defaultValue={phone}
              />
            </div>

            {formErrors?.phone && (
              <p className=" xl:text-md mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700 2xl:text-xl">
                {formErrors.phone}
              </p>
            )}
          </div>
          <div className="space-y-4 rounded-md p-4 shadow-lg">
            <h2 className="text-md sm-py-2 font-header text-stone-700 sm:text-xl">
              Address
            </h2>

            <div className="w-full sm:relative">
              {!position.latitude && !position.longitude && (
                <button
                  disabled={isLoading}
                  className="w-38 right-0 mb-2 h-full rounded-md border border-orange-500 bg-orange-200 px-4 py-2 font-primary text-sm sm:absolute xl:py-0"
                  onClick={handleGetGeo}
                >
                  {isLoading ? (
                    <div className="spinner-3  mx-10 w-8 "></div>
                  ) : (
                    'Get my position'
                  )}
                </button>
              )}
              <AddressAutofill accessToken={mapKey}>
                <input
                  name="address"
                  placeholder="Address"
                  type="text"
                  autoComplete="address-line1"
                  className="input w-full"
                  defaultValue={address}
                />
              </AddressAutofill>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                placeholder="City"
                name="city"
                required
                className="input grow"
                disabled={isLoading}
                autoComplete="address-level2"
                defaultValue={city}
              />
              <input
                placeholder="ZIP"
                name="postcode"
                required
                className="input grow"
                disabled={isLoading}
                autoComplete="postal-code"
                defaultValue={postcode}
              />
            </div>
          </div>
          <div className="mt-2 flex items-center space-x-1 font-primary text-sm sm:space-x-2 sm:text-xl">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
              className="h-4 w-4 accent-orange-400 sm:h-6 sm:w-6 "
            />
            <label htmlFor="priority">Want to give your order priority?</label>
          </div>
          <div>
            <input
              type="hidden"
              name="cart"
              value={JSON.stringify(cart)}
            ></input>
          </div>
        </div>

        {/* right part */}
        <div className="my-4 grow space-y-4 rounded-md  p-4 shadow-lg">
          <h2 className="py-2 font-header text-xl text-stone-700 md:text-2xl">
            My order
          </h2>
          <ul className="space-y-4">
            {cart.map((pizza, i) => (
              <OrderCartItem item={pizza} key={i}></OrderCartItem>
            ))}
          </ul>

          <hr></hr>
          <div className="flex justify-between font-primary text-sm text-stone-500 sm:text-lg">
            <p>Total for food</p>
            <p>{formatCurrency(cartTotalPrice)}</p>
          </div>
          {withPriority && (
            <div className="flex justify-between font-primary text-sm  text-stone-500 sm:text-lg">
              <p>Priority order</p>
              <p>{formatCurrency(priorityPrice)}</p>
            </div>
          )}

          <div className="flex justify-between font-header text-sm  text-stone-700 sm:text-3xl">
            <h2>Total</h2>
            <h2>{formatCurrency(cartTotalPrice + priorityPrice)}</h2>
          </div>

          <Button fullWidth={true} disabled={isLoading}>
            {isSubmitting ? 'Placing order...' : ' Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    userId: data.phone,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
    priorityPrice: data.priority === 'on' ? data.orderPrice * 0.2 : 0,
    address: data['address address-search'],
    status: 'preparing',
  };

  order.orderPrice = order.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us a correct phone number, we might need to contact you';
  }

  if (Object.keys(errors).length > 0) return errors;
  // If everything is ok, create new order and redirect

  await createUserDb({
    username: data.customer,
    phone: data.phone,
  });

  const newOrder = await createOrder(order);

  // Clearing cart after new order was placed

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder[0].id}`);
}

export default CreateOrder;
