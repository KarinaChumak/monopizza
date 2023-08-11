import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

function Menu() {
  const menu = useLoaderData();
  const [displayedMenu, setDisplayedMenu] = useState(menu);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(
    function () {
      setDisplayedMenu(
        menu.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    },
    [searchTerm, menu],
  );

  return (
    <div className=" min-[1757px]:px-64">
      <div className="flex justify-between py-4">
        <h1 className="font-header text-2xl text-stone-700">Pizza</h1>

        <div className="relative">
          <input
            className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-1 pr-12 focus:outline-orange-200 md:p-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>

          <button className="absolute bottom-1 right-2 md:bottom-3 ">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <AnimatePresence>
          {displayedMenu.map((pizza) => (
            <MenuItem key={pizza.pizzaId} pizza={pizza}></MenuItem>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
