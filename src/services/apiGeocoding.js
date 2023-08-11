const mapKey = import.meta.env.VITE_MAPBOX_TOKEN;

export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=address&access_token=${mapKey}`,
  );
  if (!res.ok) throw Error('Failed getting address');

  const data = await res.json();
  const { city, postcode, address } = convertMapBoxAddressToObject(
    data?.features?.at(0),
  );

  return { city, postcode, address };
}

function convertMapBoxAddressToObject(mapboxData) {
  const postcode = mapboxData.context.find((item) =>
    item.id.includes('postcode'),
  )?.text;
  const city = mapboxData.context.find((item) =>
    item.id.includes('place'),
  )?.text;
  const address = mapboxData.place_name.split(',')[0];

  return { city, postcode, address };
}
