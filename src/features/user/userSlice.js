import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  '/user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const { city, postcode, address } = await getAddress(position);

    // 3) Then we return an object with the data that we are interested in
    // Will become payload in a fulfilled state
    return { position, city, postcode, address };
  },
);

const initialState = {
  userId: 1,
  username: '',
  email: '',
  status: 'idle',
  position: {},
  addresses: [],
  error: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: {
      prepare(username, phone, birthday, email, addresses) {
        return { payload: { username, phone, birthday, email, addresses } };
      },
      reducer(state, action) {
        state.username = action.payload.username;
        state.phone = action.payload.phone;
        state.birthday = action.payload.birthday;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.status = 'idle';
        state.addresses = action.payload.addresses;
      },
    },
    resetUser() {
      return initialState;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
    },
    updateUser: {
      prepare({ username, phone, birthday, email }) {
        return { payload: { username, phone, birthday, email } };
      },
      reducer(state, action) {
        state.username = action.payload.username;
        state.phone = action.payload.phone;
        state.birthday = action.payload.birthday;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.status = 'idle';
      },
    },
    addAddress(state, action) {
      state.addresses.push(action.payload);
    },
    deleteUserAddress(state, action) {
      state.addresses = state.addresses.filter(
        (ad) => ad.id !== action.payload.id,
      );
    },
  },

  // For THUNKS => adding some async logic between dispatching action and it actually reaching the store
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.status = 'idle';
        state.city = action.payload.city;
        state.postcode = action.payload.postcode;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      }),
});

export const {
  createUser,
  resetUser,
  setStatus,
  addAddress,
  deleteUserAddress,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
