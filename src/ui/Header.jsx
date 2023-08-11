import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { getTotalCartItems } from '../features/cart/cartSlice';

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 3 || scrollY - lastScrollY < -3)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

function useIsTopPage() {
  const [isTopPage, setIsTopPage] = useState(true);

  useEffect(() => {
    const updateisTopPage = () => {
      const scrollY = window.pageYOffset;
      setIsTopPage(scrollY <= 24);
    };
    window.addEventListener('scroll', updateisTopPage); // add event listener
    return () => {
      window.removeEventListener('scroll', updateisTopPage); // clean up
    };
  }, [isTopPage]);

  return isTopPage;
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
function Header() {
  const scrollDirection = useScrollDirection();
  const isTopPage = useIsTopPage();
  const itemsInCart = useSelector(getTotalCartItems);

  const username = useSelector((state) => state.user.username);
  // [@media(min-width:1757px)]
  return (
    <header
      className={` sticky  min-[1757px]:px-64 ${
        scrollDirection === 'down' ? '-top-24' : 'top-0'
      } flex h-20 w-full items-center justify-between border-b  bg-white px-8 py-6 transition-all duration-300  ${
        isTopPage ? '' : 'drop-shadow-lg'
      }`}
    >
      <div className="font-mono font-logo text-2xl tracking-widest text-orange-600 md:text-3xl 2xl:text-5xl">
        <Link to="/menu" className="uppercase">
          Monopizza{' '}
        </Link>
      </div>
      <div className="flex space-x-8">
        <Link
          to={username ? '/account ' : '/signUp'}
          className="flex items-center gap-4"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
          {username && (
            <p className="min-[450px]:block hidden font-primary">{username}</p>
          )}
        </Link>
        <Link to="/cart" className="relative">
          <FontAwesomeIcon icon={faCartShopping} size="lg" />
          {itemsInCart > 0 && (
            <span className="absolute right-0 top-0 flex w-4 -translate-y-1/2 translate-x-1/2	items-center	 justify-center rounded-full bg-orange-500 px-1 font-primary text-xs text-white">
              {itemsInCart}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
