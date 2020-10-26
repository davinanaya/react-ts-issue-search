import React from 'react';

interface IPropsLabel {
  color: string;
  children: string
}

const Label = ({ color = 'cdcdcd', children, ...props }: IPropsLabel) => (
  <span
    className="label"
    style={{ backgroundColor: `#${color}` }}
    {...props}
  >
    {children}
  </span>
);

export default Label;
