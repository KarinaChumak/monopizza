import Button from './Button';

function NotFound() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-4">
      <img src="../../public/404.svg"></img>
      <h3 className="font-primary text-2xl text-stone-700">
        {' '}
        This page doesn&apos;t exist yet
      </h3>

      <Button to="/menu"> Go to menu </Button>
    </div>
  );
}

export default NotFound;
