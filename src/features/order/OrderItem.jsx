import { formatCurrency } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function OrderItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, weight, imageUrl } = item;

  return (
    <li className=" grid w-full grid-cols-5 items-center rounded p-4 font-primary shadow-md">
      <img src={imageUrl} className="h-16 w-full object-cover pr-4"></img>
      <div className=" col-span-2 space-y-2">
        <h3 className="font-semiBold uppercase text-stone-700">{name}</h3>
        <p className="text-stone-500">{weight}</p>
      </div>
      <div className=" col-span-2 flex items-center justify-around">
        <div className="flex rounded border border-stone-400  py-1 font-primary text-stone-700">
          <button className="px-4" onClick={() => handleDecrement(pizzaId)}>
            &minus;
          </button>
          <div className="p-1">{quantity}</div>
          <button className="px-4" onClick={() => handleIncrement(pizzaId)}>
            &#43;
          </button>
        </div>
        <div>
          <p className="font-header text-xl">{formatCurrency(totalPrice)}</p>
        </div>
        <button onClick={() => handleDelete(pizzaId)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </li>
  );
}

export default OrderItem;
