import React from 'react';
import classes from './Button.module.css';

const Button: React.FC<{
  title: string;
  secondary?: boolean;
  onClick: () => void;
}> = (props) => {
  const className = props.secondary ? classes.secondary : classes.primary;

  return (
    <button className={className} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default Button;
