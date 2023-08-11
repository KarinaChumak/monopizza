import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCurrentQuantityById,
} from '../cart/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

function MenuItem({ pizza }) {
  const { pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector((state) => state.cart.cart);
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  const dispatch = useDispatch();

  function handleClick() {
    const newPizza = {
      pizzaId,
      name,
      quantity: 1,
      weight: 400,
      unitPrice,
      totalPrice: unitPrice,
      imageUrl,
    };

    dispatch(addItem(newPizza));
  }

  function handleIncrement(id) {
    dispatch(increaseItemQuantity(id));
  }
  function handleDecrement(id) {
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-96 shrink-0 rounded-lg  shadow-lg xl:h-[400px]"
    >
      <img
        src={imageUrl}
        alt={name}
        className="h-56 w-full rounded-t-lg object-cover"
      />
      <div className="flex h-40 flex-col  p-4 xl:h-[176px]">
        <p className="font-header text-lg uppercase">{name}</p>
        <p className="font-light text-stone-600">{ingredients}</p>
        <div className="mt-auto flex items-center justify-between ">
          {/* {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>} */}

          <p className="text-lg font-bold">{formatCurrency(unitPrice)}</p>

          {currentQuantity > 0 ? (
            <div className="flex w-32 justify-between rounded bg-red-100 py-1 font-header text-xl text-orange-600">
              <button className="px-4" onClick={() => handleDecrement(pizzaId)}>
                &minus;
              </button>
              <div className="p-1">{currentQuantity}</div>
              <button className="px-4" onClick={() => handleIncrement(pizzaId)}>
                &#43;
              </button>
            </div>
          ) : (
            <Button onClick={handleClick}>Add to cart</Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MenuItem;
