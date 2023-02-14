import React from 'react';

type Props = {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
};

function Button({ className, onClick, value }: Props): JSX.Element {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
