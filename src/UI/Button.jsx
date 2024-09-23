/* eslint-disable react/jsx-props-no-spreading */
import cn from 'classnames';

export const Button = ({
  children = '',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={cn('button is-link is-outlined is-fullwidth', className)}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

<Button>dfvdfv</Button>;
