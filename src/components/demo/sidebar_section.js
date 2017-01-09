import React from 'react';

import SectionHeader from './section_header';

const SidebarSection = ({ headerPrimary, headerSecondary, className, children }) => (
  <div className='sb-section fn fcn'>
    <SectionHeader
      primary={headerPrimary}
      secondary={headerSecondary}
    />
    <div className={`sb-body ${className || ''}`}>
      {children}
    </div>
  </div>
);

SidebarSection.propTypes = {
  headerPrimary: React.PropTypes.string,
  headerSecondary: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.element
};

export default SidebarSection;
