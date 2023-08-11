import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClockRotateLeft,
  faUser,
  faArrowRightFromBracket,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getCurrentUser, signOut } from '../../services/apiUser';
import { useEffect } from 'react';
import { resetUser } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';

function Account() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (!user.isAuthenticated) {
        navigate('/signUp');
      }
    },
    [user, navigate],
  );

  function handleLogOut() {
    signOut();
    dispatch(resetUser());

    navigate('/menu');
  }

  return (
    <div className="flex  flex-col sm:flex-row min-[1757px]:px-64">
      <div className=" mt-8 flex  w-full  shrink-0 flex-row  justify-around gap-2 font-primary text-lg text-stone-500  sm:mt-20 sm:w-64 sm:flex-col sm:justify-normal sm:gap-6 2xl:text-xl">
        <NavLink
          to="orders"
          className=" flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <p className="hidden text-sm sm:block sm:text-lg ">Order history</p>
        </NavLink>
        <NavLink
          to="personal"
          className=" flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <FontAwesomeIcon icon={faUser} />
          <p className="hidden text-sm sm:block sm:text-lg ">Profile</p>
        </NavLink>
        <NavLink
          to="adresses"
          className=" flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <FontAwesomeIcon icon={faLocationDot} />
          <p className="hidden text-sm sm:block sm:text-lg ">
            Delivery addresses
          </p>
        </NavLink>
        <hr></hr>

        <button
          onClick={handleLogOut}
          className=" flex flex-col items-start  gap-3 sm:flex-row"
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} />

          <p className="hidden text-sm sm:block sm:text-lg ">Log out</p>
        </button>
      </div>

      <div className="mt-12 w-full p-8 shadow-md">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Account;
