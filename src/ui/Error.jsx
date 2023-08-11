import { useNavigate, useRouteError } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Button from './Button';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  error;
  return (
    <div className="layout">
      <Header></Header>
      <main className="px-8">
        {error?.status === 404 ? (
          <NotFound></NotFound>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center gap-4 ">
            <h1 className="font-header text-3xl text-stone-700">
              Oops... Something went wrong 😢
            </h1>

            <Button onClick={() => navigate(-1)}>&larr; Go back</Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Error;
