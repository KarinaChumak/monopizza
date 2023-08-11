import supabase from './supabase';

export async function signIn(phone) {
  let { data, error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function verify({ phone, otp }) {
  let { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: 'sms',
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

// for dev purposes
export async function phoneSignIn({ phone }) {
  var { data, error } = await supabase.auth.signUp({
    phone,
    password: phone,
  });

  data.addresses = [];

  if (!error) return data;

  if (!error.message === 'User already registered') {
    throw new Error(error.message);
  }

  const res = await supabase.auth.signInWithPassword({
    phone,
    password: phone,
  });

  return res.data;
}

export async function signOut() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function createUser({ username, phone, authId }) {
  ({ username, phone, authId });
  const newUser = authId ? { username, phone, authId } : { username, phone };
  const { data, error } = await supabase
    .from('users')
    .insert([newUser])
    .select();

  return { data, error };
}

export async function updateUser({ phone, username, email, birthday }) {
  const queryObj = {
    ...(username && { username }),
    ...(birthday && { birthday }),
    ...(email && { email }),
  };

  queryObj;

  const { data, error } = await supabase
    .from('users')
    .update(queryObj)
    .eq('phone', phone)
    .select();

  if (error) throw new Error(error.message);
  data;
  error;
  return { data, error };
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  let { data: fullUserInfo, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('authId', data.user.id);

  if (userError) throw new Error(userError.message);

  return fullUserInfo[0];
}

export async function createAddress({ phone, address, city, postcode, tag }) {
  ({ userId: phone, address, city, postcode, tag });
  const { data, error } = await supabase
    .from('addresses')
    .insert([{ userId: phone, address, city, postcode, tag }])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUserAddresses({ phone }) {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('userId', phone);

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteAddress({ id }) {
  const { error } = await supabase.from('addresses').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return null;
}

export async function getRecentOrders({ userId }) {
  userId;
  let { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('userId', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);

  orders;
  return orders.slice(0, 5);
}
