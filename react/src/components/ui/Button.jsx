import React from 'react';

const Button = ({ children, className = '', type = 'button', variant = 'primary', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 shadow-soft transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent';

  let variantClasses = '';
  if (variant === 'secondary') {
    variantClasses = 'bg-white text-gray-900 border border-line hover:bg-gray-50';
  } else if (variant === 'danger') {
    variantClasses = 'bg-red-500 text-white hover:bg-red-600';
  } else {
    variantClasses = 'bg-accent text-white hover:opacity-90 active:opacity-80';
  }

  return (
    <button
      data-easytag="id1-react/src/components/ui/Button.jsx"
      type={type}
      className={`${base} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
