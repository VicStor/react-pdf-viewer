import React from 'react';
import { Link } from 'react-router';


const NavLink = (props) => (
  <Link {...props} activeClassName='active' className='nav-link'/>
)
export default NavLink;
