import { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import store from '../../store';
import { updateUser as updateUserDb } from '../../services/apiUser';

import { updateUser } from '../user/userSlice';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

function isValidEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function Profile() {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const [value, setValue] = useState({
    startDate: user?.birthday,
    endDate: user?.birthday,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const errors = useActionData();

  function handleValueChange(newValue) {
    // setIsDisabled(false);
    setValue(newValue);
  }

  const isSubmitting = navigation.state === 'submitting';

  isSubmitting;
  navigation.state;

  return (
    <div>
      <h2 className="font-header text-2xl text-stone-700 2xl:text-3xl">
        Profile settings
      </h2>
      <Form method="POST" action="">
        <input
          name="username"
          className="input my-6 w-2/3 lg:w-1/2"
          placeholder="Name"
          defaultValue={user.username}
          onChange={() => setIsDisabled(false)}
        ></input>
        <p className="font-semiBold text-sm text-stone-700 sm:text-lg  2xl:text-xl">
          Phone number
        </p>
        <input
          readOnly={true}
          name="phone"
          className="input mt-2 w-2/3 font-primary text-stone-400 lg:w-1/2 2xl:text-xl"
          defaultValue={user.phone}
        ></input>
        <hr className="my-6"></hr>

        <p className="font-semiBold text-sm text-stone-700 sm:text-lg 2xl:text-xl">
          Please enter your email to receive special offers and promocodes
        </p>
        <input
          name="email"
          className="input my-6 w-2/3 lg:w-1/2"
          placeholder="Email"
          defaultValue={user.email}
          onChange={() => setIsDisabled(false)}
        ></input>

        {errors?.email && (
          <p className=" mt-2 w-1/2 rounded-md bg-red-100 p-2  text-xs text-red-700">
            {errors.email}
          </p>
        )}
        <hr className="my-6"></hr>

        <p className="font-semiBold text-sm text-stone-700  sm:text-lg 2xl:text-xl">
          Please select your birthday to receive gifts and bonuses
          <div className="my-6 w-2/3 lg:w-1/2">
            <Datepicker
              primaryColor="orange"
              value={value}
              onChange={handleValueChange}
              useRange={false}
              asSingle={true}
              startFrom={new Date('1940-01-01')}
              maxDate={new Date('2010-01-01')}
              inputClassName="input p-2 w-full "
              inputName="birthday"
            />
          </div>
        </p>

        <Button disabled={isDisabled}>Save changes</Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  formData;
  const data = Object.fromEntries(formData);
  data;

  const errors = {};
  if (data.email && !isValidEmail(data.email)) {
    errors.email = 'The email provided is not a valid email';
  }

  if (Object.keys(errors).length > 0) return errors;

  await updateUserDb(data);

  store.dispatch(updateUser(data));

  return redirect(`/account/personal`);
}

export default Profile;
