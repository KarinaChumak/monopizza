import { useEffect, useState } from 'react';
import { getRecentOrders } from '../../services/apiUser';
import { useSelector } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/helpers';
import store from '../../store';
import OrderHistoryItem from './OrderHistoryItem';

function OrderHistory() {
  const recentOrders = useLoaderData();

  return (
    <div className="min-h-[60vh]">
      <h2 className="mb-4 font-header text-2xl text-stone-700 2xl:text-3xl">
        Order history
      </h2>
      {recentOrders.length > 0 ? (
        <ul className="space-y-4">
          {recentOrders.map((order) => (
            <OrderHistoryItem key={order.id} order={order}></OrderHistoryItem>
          ))}
        </ul>
      ) : (
        <div className="mt-12 space-y-4 ">
          <img src="empty.svg" className="mx-auto"></img>
          <p className="mx-auto text-center font-primary text-lg text-stone-700">
            You haven&apos;t ordered anything yet
          </p>
        </div>
      )}
    </div>
  );
}

export async function loader() {
  const orders = await getRecentOrders({
    userId: store.getState().user.phone,
  });

  orders;
  return orders;
}

export default OrderHistory;
