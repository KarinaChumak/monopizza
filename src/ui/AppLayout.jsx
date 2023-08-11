import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="layout">
      {isLoading && <Loader></Loader>}
      <Header></Header>
      <main className="px-8">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default AppLayout;
