import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function EmptyCart() {
  return (
    <div className="mt-8 min-[1757px]:px-64">
      <Button to="/menu" filled={false}>
        &larr; Back to menu
      </Button>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="h-24 text-orange-200"
        ></FontAwesomeIcon>
        <p className=" text-md font-header leading-[3rem] text-stone-700 sm:text-3xl 2xl:text-5xl 2xl:leading-[4rem]">
          Your cart is still empty <br></br>Start adding some pizzas 🍕🍕
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;
