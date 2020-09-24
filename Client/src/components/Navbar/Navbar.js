import React, { useState, useEffect } from 'react'

const Navbar = _ => {
  const [navbarState, setNavbarState] = useState({
    isLoggedIn: false,
    loggedOut: true
  })

  useEffect(_ => {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
      setNavbarState({ ...navbarState, isLoggedIn: true, loggedOut: false })
    } else {
      setNavbarState({ ...navbarState, isLoggedIn: false, loggedOut: true })
    }
  }, [])

  navbarState.handleLogout = e => {
    setNavbarState({ ...navbarState, isLoggedIn: false })
    sessionStorage.setItem('isLoggedIn', 'false')
    sessionStorage.setItem('token', '')
  }

  return (
    <ul id='navBar'>
      <li className='navLILeft'><a className='navLink' href='/'>Home</a></li>
      <li className='navLILeft'><a className='navLink' href='/search'>Search</a></li>
      {navbarState.isLoggedIn
        ? <li className='navLIRight'><a className='navLink' href='/' onClick={navbarState.handleLogout}>Logout</a></li> : null}
      {navbarState.loggedOut
        ? <li className='navLIRight'><a className='navLink' href='/signup'>Signup</a></li>
        : null
      }
      {navbarState.loggedOut
        ? <li className='navLIRight'><a className='navLink' href='/login'>Login</a></li>
        : null
      }
    </ul>
  )
}

export default Navbar
