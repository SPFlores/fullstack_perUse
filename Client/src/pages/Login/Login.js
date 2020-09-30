import React, { useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const LoginPage = _ => {
  const username = useRef()
  const password = useRef()

  const [userState, setUserState] = useState({
    isLoggedIn: false,
    failedLoginUsername: false,
    failedLoginPassword: false,
    logginError: false
  })

  userState.renderRedirect = _ => {
    if (userState.isLoggedIn) {
      return <Redirect to='/' />
    }
  }

  userState.handleLogInUser = e => {
    e.preventDefault()
    if (username.current.value === '' && password.current.value === '') {
      setUserState({
        ...userState,
        failedLoginUsername: true,
        failedLoginPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (username.current.value === '') {
      setUserState({
        ...userState,
        failedLoginUsername: true,
        failedLoginPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value === '') {
      setUserState({
        ...userState,
        failedLoginUsername: false,
        failedLoginPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else {
      axios.get(`/login/${username.current.value}/${password.current.value}`)
        .then(({ data: user }) => {
          if (user[0]) {
            setUserState({ ...userState, isLoggedIn: true })
            console.log(user[0])
            sessionStorage.setItem('isLoggedIn', true)
            sessionStorage.setItem('name', user[0].name)
            sessionStorage.setItem('username', user[0].username)
            sessionStorage.setItem('usertype', user[0].role)
          } else {
            setUserState({ ...userState, logginError: true, failedLoginPassword: false, failedLoginUsername: false })
          }
        })
        .catch(e => {
          setUserState({ ...userState, isLoggedIn: false })
        })
    }
  }

  return (
    <div className='mainArea'>
      {userState.isLoggedIn ? userState.renderRedirect() : null}

      <div>
        <h4 className='userPlease'>Log in to get the most out of perUse!</h4>
      </div>

      <form>
        <h5>Login To Your Account</h5>
        <div>
          {userState.logginError ? <p style={{ color: '#ef6461' }}>Oops! Please check your username and password to make sure they are correct. If you don't have an account you can sign up using the button at the bottom of the page!</p> : null}

        </div>
        <div>
          {userState.failedLoginUsername ? <p style={{ color: '#ef6461' }}>Please enter your username!</p> : null}
          <label htmlFor='username'>Username: </label>
          <input type='text' id='username' name='username' ref={username} className='usernameEntry' />
        </div>
        <div>
          {userState.failedLoginPassword ? <p style={{ color: '#ef6461' }}>Please enter your password!</p> : null}
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' name='password' ref={password} className='passwordEntry' />
        </div>
        {/* checkbox for "remember me" that sets local storage */}
        {/* <div>
          <input type='checkbox' name='rememberMe' id='rememberMe' ref={rememberMe} />
          <label htmlFor='rememberMe'>Remember Me</label>
        </div> */}
        <button onClick={userState.handleLogInUser} className='loginPgBtn'>Submit</button>
      </form>

      <br />

      <h5>Don't have an account? No problem!</h5>
      <Link to='/signup'>
        <button className='loginPgBtn'>Sign Up</button>
      </Link>
    </div>
  )
}

export default LoginPage
