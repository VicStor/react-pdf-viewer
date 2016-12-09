import React from 'react';

const Loader = ({ loadingProgress }) => {
  const pct = () => {
    let val = parseInt(loadingProgress);
    // var $circle = $('#svg #bar');
    const radius = 15; // $circle.attr('r');
    const c = 2 * Math.PI * radius;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    return (1 - (val / 100)) * c;
  };
  return (
    <div className='loadbar menu-button d_f a_i-center j_c-center'>
      <svg
        id='loadbar' width='38' height='38'
        viewPort='0 0 38 38' version='1.1' xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          r='15' cx='19' cy='19' fill='transparent'
          strokeDasharray='95' strokeDashoffset='0'
        />
        <circle
          id='bar' r='15' cx='19' cy='19' fill='transparent'
          strokeDasharray='95' strokeDashoffset='0'
          style={{ strokeDashoffset: `${pct()}px` }}
        />
        <text x='19' y='22'>{`${loadingProgress}%`}</text>
      </svg>
    </div>
  );
};

export default Loader;
