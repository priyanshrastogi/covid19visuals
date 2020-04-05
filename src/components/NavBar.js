import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link class="navbar-item" to='/'>
          <img src={require('../covid19visuals.png')} width='100px'/>
        </Link>
      </div>
    </nav>
  )
}