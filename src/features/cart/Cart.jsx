import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';

import CartItem from './CartItem';
import { getTotalCartPrice, clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const cartTotal = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart></EmptyCart>;

  return (
    <div className="mt-6 min-[1757px]:px-64">
      <Button to="/menu" filled={false}>
        &larr; Back to menu
      </Button>

      <h1 className=" my-6 font-header text-lg text-stone-700 sm:text-3xl xl:m-auto xl:my-4 xl:w-1/2">
        Items in your cart
      </h1>

      <ul className="w-full space-y-4 md:w-2/3 xl:m-auto xl:w-1/2">
        {cart.map((item, i) => (
          <CartItem item={item} key={i}></CartItem>
        ))}
      </ul>

      <div className="my-4 flex w-full justify-between font-header uppercase text-stone-700 sm:text-2xl md:w-2/3 xl:m-auto xl:my-4 xl:w-1/2">
        <h3>Total</h3>
        <h3> {formatCurrency(cartTotal)}</h3>
      </div>

      <div className="flex w-full justify-between md:w-2/3 xl:m-auto xl:my-4 xl:w-1/2">
        <Button filled={false} onClick={handleClearCart}>
          Clear cart
        </Button>

        <Button to="/order/new">Order pizzas</Button>
      </div>
    </div>
  );
}

export default Cart;
