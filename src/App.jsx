import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as newOrderAction,
} from './features/order/CreateOrder';

import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Account from './features/user/Account';
import CreateUser from './features/user/CreateUser';
import OrderHistory, {
  loader as historyLoader,
} from './features/user/OrderHistory';
import Profile, { action as profileAction } from './features/user/Profile';
import Adresses from './features/user/Adresses';
import { useEffect } from 'react';
import { getCurrentUser, getCurrentUserAddresses } from './services/apiUser';
import { useDispatch } from 'react-redux';
import {
  createUser,
  resetUser,
  setStatus,
} from '../src/features/user/userSlice';

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Navigate to="/menu" replace />,
      },
      {
        path: '/menu',
        element: <Menu></Menu>,
        loader: menuLoader,
        errorElement: <Error></Error>,
      },
      { path: '/cart', element: <Cart></Cart> },
      {
        path: '/order/new',
        element: <CreateOrder></CreateOrder>,
        action: newOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order></Order>,
        errorElement: <Error></Error>,

        loader: orderLoader,
      },

      {
        path: '/account',
        element: <Account></Account>,
        children: [
          {
            path: 'orders',
            element: <OrderHistory></OrderHistory>,
            loader: historyLoader,
          },
          {
            path: 'personal',
            element: <Profile></Profile>,
            action: profileAction,
          },
          {
            path: 'adresses',
            element: <Adresses></Adresses>,
          },
          {
            path: '',
            element: <OrderHistory></OrderHistory>,
            loader: historyLoader,
          },
        ],
      },

      {
        path: '/signUp',
        element: <CreateUser></CreateUser>,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(
    function () {
      async function initializeUser() {
        dispatch(setStatus('loading'));
        const user = await getCurrentUser();
        const addresses = await getCurrentUserAddresses({ phone: user.phone });

        if (user) {
          dispatch(
            createUser(
              user.username,
              user.phone,
              user.birthday,
              user.email,
              addresses,
            ),
          );
        }

        if (!user) {
          dispatch(resetUser());
        }
      }

      initializeUser();
    },

    [dispatch],
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
