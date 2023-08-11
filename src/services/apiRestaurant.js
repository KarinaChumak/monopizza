const API_URL = 'https://react-fast-pizza-api.onrender.com/api';
import supabase from './supabase';

function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes);

  return date;
}

export async function getMenu() {
  // const res = await fetch(`${API_URL}/menu`);

  let { data: menu, error } = await supabase.from('menu').select('*');

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (error) throw Error('Failed getting menu');

  return menu;
}

export async function getOrder(id) {
  let { data: order, error } = await supabase
    .from('orders')
    .select(
      `id, status, priority, orderPrice, priorityPrice, estimatedDelivery, address, city, postcode,
    user: userId (username, phone)

    `,
    )
    .eq('id', id);

  if (error) throw Error(`Couldn't find order #${id}`);

  const cart = await fetchCartByOrderId(id);

  const {
    status,
    priority,
    orderPrice,
    priorityPrice,
    estimatedDelivery,
    user,
  } = order[0];

  order = {
    id,
    ...user,
    status,
    priority,
    orderPrice,
    priorityPrice,
    estimatedDelivery,
    cart,
  };

  return order;
}

export async function fetchCartByOrderId(orderId) {
  let { data: cart, error } = await supabase
    .from('carts')
    .select(
      `
    quantity, pizzaId,
    menu: pizzaId (
      name, unitPrice, ingredients, imageUrl, weight
    )
  `,
    )
    .eq('orderId', orderId);

  if (error) throw Error(`Couldn't find order cart #${orderId}`);

  cart = cart.map((item) => {
    return {
      ...item.menu,
      pizzaId: item.pizzaId,
      quantity: item.quantity,
      totalPrice: item.quantity * item.menu.unitPrice,
    };
  });

  return cart;
}

export async function createOrder(newOrder) {
  const {
    userId,
    status,
    postcode,
    priority,
    address,
    city,
    orderPrice,
    priorityPrice,
    cart,
  } = newOrder;

  const estimatedDelivery = addMinutes(new Date(Date.now()), 40);
  estimatedDelivery;
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          userId,
          status,
          postcode,
          priority,
          address,
          city,
          orderPrice,
          priorityPrice,
          estimatedDelivery,
        },
      ])
      .select();

    if (error) throw Error();
    const newOrderId = data[0].id;

    const cartMapped = cart.map((item) => {
      return {
        pizzaId: item.pizzaId,
        quantity: item.quantity,
        orderId: newOrderId,
      };
    });

    const { dataCart, errorCart } = await supabase
      .from('carts')
      .insert(cartMapped)
      .select();

    if (errorCart) throw Error();

    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}
