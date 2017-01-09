import React from 'react';

const Input = props => (
  <input
    {...props}
    data-name={props.name}
  />
);

Input.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Input;
