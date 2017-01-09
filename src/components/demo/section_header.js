import React from 'react';

const SectionHeader = ({ primary, secondary }) => (
  <div className='sb-header fn rel'>
    <p className='sb-primary'>{primary}</p>
    <p className='sb-sub'>{secondary}</p>
  </div>
);

SectionHeader.propTypes = {
  primary: React.PropTypes.string,
  secondary: React.PropTypes.string
};

export default SectionHeader;
