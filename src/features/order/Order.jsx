// Test ID: IIDSAT, CQE92U

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import SearchOrder from './SearchOrder';

import { getOrder } from '../../services/apiRestaurant';
import { useFetcher, useLoaderData } from 'react-router-dom';
import OrderCartItem from './OrderCartItem';
import { useEffect } from 'react';
import { data } from 'autoprefixer';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  return (
    <div className="mt-6 w-full space-y-4 md:space-y-12 lg:w-2/3 min-[1757px]:w-full min-[1757px]:px-64">
      <div className=" flex flex-col items-center justify-between space-y-2 min-[470px]:flex-row">
        <h2 className=" font-header text-lg uppercase text-stone-700 md:text-2xl 2xl:text-3xl min-[1757px]:mx-auto">
          Order <span className="px-2 text-orange-600"> {id}</span> Status
        </h2>

        <div className="space-x-2 min-[1757px]:mx-auto">
          {!priority && (
            <span className="text-md rounded-full border border-teal-500 bg-teal-100/40 px-1 py-1  font-primary text-stone-700 md:px-2 md:text-lg">
              priority
            </span>
          )}
          <span className="text-md rounded-full border border-orange-500 bg-orange-100/40 px-1  py-1 font-primary text-stone-700 md:px-2 md:text-lg">
            {status} order
          </span>
        </div>
      </div>

      <div className=" text-md flex flex-col justify-between rounded-md border p-4 font-primary text-stone-700 md:flex-row md:p-8 md:text-lg min-[1757px]:mx-48">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="space-y-4 min-[1757px]:mx-48">
        {cart.map((item) => {
          return (
            <OrderCartItem
              key={item.pizzaId}
              item={item}
              isLoading={fetcher.state === 'loading'}
            ></OrderCartItem>
          );
        })}
      </ul>

      <div className=" text-md flex flex-col justify-between rounded-md border border-orange-500 bg-orange-100/40 p-4 font-primary text-stone-700 sm:text-lg md:flex-row md:p-8 min-[1757px]:mx-48">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className=" font-semiBold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
