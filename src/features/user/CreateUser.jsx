import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import OtpInput from 'react-otp-input';

import Button from '../../ui/Button';
import { createUser } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Form } from 'react-router-dom';
import { isValidPhone } from '../../utils/helpers';
import {
  signIn,
  verify,
  createUser as createUserDb,
  phoneSignIn,
} from '../../services/apiUser';

function CreateUser() {
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(
    function () {
      if (user.isAuthenticated) {
        navigate('/account/orders');
      }
    },
    [user, navigate],
  );

  function handleRequestOtp(e) {
    setErrors([]);
    ('triggered handle sublit');
    e.preventDefault();

    if (!username)
      setErrors((errors) => [...errors, 'Please provide your name']);
    if (!phone || !isValidPhone(phone))
      setErrors((errors) => [...errors, 'Please provide a valid phone number']);

    if (!username || !phone || !isValidPhone(phone)) return;

    setOtpRequested(true);

    // signIn(phone);
  }

  async function handleVerifyOtp(e) {
    setErrors([]);

    e.preventDefault();

    // const data = await verify({ phone, otp });

    const data = await phoneSignIn({ phone });

    data;

    if (data.user) {
      createUserDb({ username, phone, authId: data.user.id });
      dispatch(createUser(username, phone));

      navigate('/account/orders');
    }
  }

  return (
    <div className="my-8 flex h-[80vh] justify-between gap-8 min-[1757px]:px-64">
      <div className="  hidden grow flex-col justify-center bg-gradient-to-r from-orange-50 to-teal-50 sm:flex">
        <div className="mx-auto space-y-6  ">
          <div className="  flex items-center gap-4 font-primary text-stone-700">
            <span className="inline-block flex aspect-square w-9 items-center justify-center rounded-full bg-white shadow-md">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="lg"
                className="text-orange-400"
              />
            </span>
            <p>Save your favourite addresses</p>
          </div>
          <div className=" flex items-center gap-3 font-primary text-stone-700">
            <span className="inline-block flex aspect-square w-9 items-center justify-center rounded-full bg-white shadow-md">
              <FontAwesomeIcon
                icon={faList}
                size="lg"
                className="text-orange-400"
              />
            </span>
            <p>Track order history</p>
          </div>
        </div>
      </div>
      <div className=" mt-24 w-96 grow">
        <h1 className="mb-2 font-header text-xl leading-10 text-stone-700 sm:text-3xl">
          👋 Welcome!
        </h1>

        <h1 className="mb-4 font-header text-xl leading-10  text-stone-700 sm:text-3xl">
          Please enter your contact data:
        </h1>
        {otpRequested ? (
          <form onSubmit={handleVerifyOtp}>
            <p className="mb-4 font-primary text-lg text-stone-500 sm:text-xl">
              Please enter the code from SMS
            </p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle="border rounded-md  text-3xl font-primary text-stone-700 w-16 h-16 focus:outline-orange-500 focus:bg-orange-100 mr-2 mb-2"
              placeholder="oooooo"
              shouldAutoFocus
              renderSeparator={<span className="w-2"></span>}
              renderInput={(props) => <input {...props} />}
            />
            <div className="mt-2">
              <Button>Verify</Button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleRequestOtp}
            className="items-strech flex w-full flex-col gap-4 sm:w-1/2"
          >
            <p className=" font-primary text-stone-500">{`You'll receive a code via SMS`}</p>
            <input
              type="text"
              placeholder="Your full name"
              value={username}
              className="input "
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your phone number"
              value={phone}
              className="input"
              onChange={(e) => setPhone(e.target.value)}
            />

            {errors.length > 0 && (
              <ul>
                {errors.map((err, i) => (
                  <li key={i}>
                    <p className=" mt-2  rounded-md bg-red-100 p-2  text-xs text-red-700">
                      {err}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <Button fullWidth={true}>Send me a code</Button>
          </form>
        )}
      </div>
    </div>
  );
}

// export async function action({ request }) {
//   ('action submitted');

//   const data = Object.fromEntries(formData);

//   const errors = {};
//   if (!isValidPhone(data.phone)) {
//     errors.phone =
//       'Please give us a correct phone number, we might need to contact you';
//   }

//   if (Object.keys(errors).length > 0) return errors;
// }

export default CreateUser;
