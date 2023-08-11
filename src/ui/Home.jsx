import SearchOrder from '../features/order/SearchOrder';
import Header from './Header';
import { AddressAutofill } from '@mapbox/search-js-react';

const mapKey = import.meta.env.VITE_MAPBOX_TOKEN;

function Home() {
  return (
    <div>
      <form className="flex flex-col">
        <AddressAutofill accessToken={mapKey}>
          <input
            name="address"
            placeholder="Address"
            type="text"
            autoComplete="address-line1"
          />
        </AddressAutofill>
      </form>
    </div>
  );
}

export default Home;
