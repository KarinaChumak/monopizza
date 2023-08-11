import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
} from './cartSlice';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, weight, imageUrl } = item;
  const dispatch = useDispatch();

  function handleIncrement(id) {
    dispatch(increaseItemQuantity(id));
  }
  function handleDecrement(id) {
    dispatch(decreaseItemQuantity(id));
  }
  function handleDelete(id) {
    dispatch(deleteItem(id));
  }

  return (
    <li className=" grid w-full grid-cols-4 items-center rounded p-4 font-primary shadow-md sm:grid-cols-5">
      <img
        src={imageUrl}
        className="hidden h-16 w-full object-cover pr-4 sm:block"
      ></img>
      <div className=" col-span-2 space-y-2">
        <h3 className="font-semiBold text-sm uppercase text-stone-700 sm:text-lg">
          {name}
        </h3>
        <p className="text-stone-500">{weight}</p>
      </div>
      <div className=" col-span-2 flex items-center justify-around">
        <div className="flex rounded border border-stone-400  py-1 font-primary text-stone-700">
          <button
            className="px-2 sm:px-4"
            onClick={() => handleDecrement(pizzaId)}
          >
            &minus;
          </button>
          <div className="p-1">{quantity}</div>
          <button
            className="px-2 sm:px-4"
            onClick={() => handleIncrement(pizzaId)}
          >
            &#43;
          </button>
        </div>
        <div>
          <p className="font-header text-sm sm:text-xl">
            {formatCurrency(totalPrice)}
          </p>
        </div>
        <button onClick={() => handleDelete(pizzaId)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </li>
  );
}

export default CartItem;
