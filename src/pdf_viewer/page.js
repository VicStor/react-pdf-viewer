import React from 'react';

const Page = ({ style, className = '', children }) => (
  <div
    className={[className, 'page fn ofh df aic jcc rel'].join(' ')}
    style={style}
  >
    {children}
  </div>
);
export default Page;
