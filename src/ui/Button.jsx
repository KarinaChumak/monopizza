import { Link } from 'react-router-dom';

function Button({
  children,
  disabled = false,
  fullWidth = false,
  to = '',
  filled = true,
  onClick,
}) {
  const className = filled
    ? `rounded bg-orange-600 px-4 py-3 font-header  text-sm md:text-md  uppercase text-white outline-none transition-all duration-300 hover:bg-orange-700 focus:ring focus:ring-orange-700 focus:ring-offset-2 disabled:bg-orange-700${
        fullWidth ? 'w-full' : ''
      }`
    : 'rounded border border-2 border-orange-500  px-4 py-2 font-semiBold text-sm md:text-md   uppercase text-stone-700';

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={className}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;
