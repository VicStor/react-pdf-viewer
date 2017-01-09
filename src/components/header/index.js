import React from 'react';
import { Link } from 'react-router';

import NavLink from './main_link';


const Header = () => (
  <div className='page-header raised frn aic jcs w-max'>
    <div className='logo-wrapper fn m_r-20'>
      <Link to='/'>
        <div className='main-logo'>
          <img className='img-fit' alt='' src='img/logo.svg' />
        </div>
      </Link>

    </div>
    <div className='fm abs right_0'>
      <ul className='main-nav frn no_style sserif'>
        <li className='m_r-20'>
          <NavLink to='demo'>Demo</NavLink>
        </li>
        <li className='m_r-20'>
          <NavLink to='api'>Api</NavLink>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
