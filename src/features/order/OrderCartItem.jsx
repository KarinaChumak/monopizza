import { formatCurrency } from '../../utils/helpers';

function OrderCartItem({ item, isLoading = false }) {
  return (
    <li className="grid grid-cols-4 grid-rows-2 gap-y-1 ">
      {isLoading ? (
        <div className=" row-span-2 h-16 w-full">
          <div className="spinner-6 m-auto"></div>
        </div>
      ) : (
        <img
          className="row-span-2 h-16 w-full object-cover pr-3"
          src={item.imageUrl}
        ></img>
      )}

      <p className="col-span-3 font-semiBold text-sm uppercase text-stone-700 sm:text-xl min-[871px]:text-lg xl:text-xl">
        {item.name}
      </p>
      <div className="col-span-3 flex justify-between text-sm sm:text-xl">
        <p className="font-primary text-stone-400">{item.weight} gr.</p>
        <p className="font-primary text-stone-400">{item.quantity} pc.</p>
        <p className="font-primary font-semiBold uppercase text-stone-700">
          {formatCurrency(item.totalPrice)}
        </p>
      </div>
    </li>
  );
}

export default OrderCartItem;
