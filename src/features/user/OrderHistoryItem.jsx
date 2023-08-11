import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/helpers';

function OrderHistoryItem({ order }) {
  return (
    <li>
      <Link to={`/order/${order.id}`}>
        <div
          className={`flex flex-col items-start justify-between gap-2 rounded border p-4  font-primary text-stone-700 sm:flex-row 
        sm:items-center
      
      ${
        order.status === 'preparing'
          ? 'border-orange-400 bg-orange-300/50 '
          : 'border-green-400 bg-green-300/50'
      }
      `}
        >
          <div className="space-y-2 text-sm sm:text-lg">
            <p>
              {order.status === 'preparing'
                ? 'Estimated delivery'
                : 'Delivered'}
              : {formatDate(order.estimatedDelivery)}
            </p>
            <p>{order.address}</p>

            <div className="flex gap-4 font-header  text-stone-700">
              <h2>Total</h2>
              <h2>{formatCurrency(order.orderPrice + order.priorityPrice)}</h2>
            </div>
          </div>
          <div>
            <p
              className={`sm:text-md rounded-full  px-2 py-1 font-header text-sm uppercase text-white
          
          ${order.status === 'preparing' ? ' bg-orange-600' : ' bg-green-600'}`}
            >
              {order.status}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default OrderHistoryItem;
