import React, { useState, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

const SignupPage = _ => {
  const name = useRef()
  const username = useRef()
  const password = useRef()
  const passwordConf = useRef()

  const [newUserState, setNewUserState] = useState({
    isLoggedIn: false,
    failedAll: false,
    failedSignupName: false,
    failedSignupUsername: false,
    failedSignupPassword: false,
    failedConfirmPassword: false
  })

  newUserState.renderRedirect = _ => {
    if (newUserState.isLoggedIn) {
      return <Redirect to='/' />
    }
  }

  newUserState.handleSignUpUser = e => {
    e.preventDefault()
    if (name.current.value === '' && username.current.value === '' && password.current.value === '') {
      setNewUserState({
        ...newUserState,
        failedAll: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (name.current.value === '') {
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupName: true,
        failedSignupUsername: false,
        failedSignupPassword: false,
        failedConfirmPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (username.current.value === '') {
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSigupName: false,
        failedSignupUsername: true,
        failedSignupPassword: false,
        failedConfirmPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value === '') {
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupnName: false,
        failedSignupUsername: false,
        failedSignupPassword: true,
        failedConfirmPassword: false
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else if (password.current.value !== passwordConf.current.value) {
      setNewUserState({
        ...newUserState,
        failedAll: false,
        failedSignupnName: false,
        failedSignupUsername: false,
        failedSignupPassword: false,
        failedConfirmPassword: true
      })
      sessionStorage.setItem('isLoggedIn', false)
    } else {
      const user = {
        username: username.current.value,
        password: password.current.value,
        name: name.current.value
      }
      const config = {
        method: 'post',
        url: 'https://divercity-test.herokuapp.com/register',
        data: user
      }

      axios(config)
        .then(({ data }) => {
          const user = {
            username: username.current.value,
            password: password.current.value
          }
          const config = {
            method: 'post',
            url: 'https://divercity-test.herokuapp.com/login',
            data: user
          }

          axios(config)
            .then(({ data }) => {
              sessionStorage.setItem('isLoggedIn', true)
              sessionStorage.setItem('token', data.token)
              setNewUserState({ ...newUserState, isLoggedIn: true })
            })
            .catch(e => console.log(e))
        })
        .catch(e => {
          alert('Unable to register!')
          console.log(e)
        })

      // axios.post('/register', {
      //   username: username.current.value,
      //   password: password.current.value,
      //   name: name.current.value
      // })
      //   .then(_ => {
      //     axios.post('/login', {
      //       username: username.current.value,
      //       password: password.current.value
      //     })
      //       .then(({ data }) => {
      //         sessionStorage.setItem('isLoggedIn', true)
      //         sessionStorage.setItem('token', data.token)
      //         setNewUserState({ ...newUserState, isLoggedIn: true })
      //       })
      //       .catch(e => console.log(e))
      //   })
      //   .catch(e => {
      //     alert('Unable to register!')
      //     console.log(e)
      //   })
    }
  }

  return (
    <div className='mainArea'>
      {newUserState.isLoggedIn ? newUserState.renderRedirect() : null}

      <div>
        <h4 className='userPlease'>Sign up to get the most out of perUse!</h4>
      </div>

      <form>
        <h5>Sign Up For An Account</h5>
        <div>
          {newUserState.failedAll ? <p style={{ color: '#ef6461' }}>Please enter your information!</p> : null}
          {newUserState.failedSignupName ? <p style={{ color: '#ef6461' }}>Please enter your name!</p> : null}
          <label htmlFor='name'>Name: </label>
          <input type='text' name='name' ref={name} id='nameEntry' />
        </div>
        <div>
          {newUserState.failedSignupUsername ? <p style={{ color: '#ef6461' }}>Please enter your username!</p> : null}
          <label htmlFor='username'>Username: </label>
          <input type='text' id='username' name='username' ref={username} className='usernameEntry' />
        </div>
        <div>
          {newUserState.failedSignupPassword ? <p style={{ color: '#ef6461' }}>Please enter a password!</p> : null}
          <label htmlFor='password'>Password: </label>
          <input type='password' id='password' name='password' ref={password} className='passwordEntry' />
        </div>
        <div>
          {newUserState.failedConfirmPassword ? <p style={{ color: 'red' }}>Your passwords do not match!</p> : null}
          <label htmlFor='passwordConf'>Password: </label>
          <input type='password' id='passwordConf' name='passwordConf' ref={passwordConf} className='passwordEntry' />
        </div>
        <button onClick={newUserState.handleSignUpUser} className='signupBtn'>Submit</button>
      </form>

      <br />

      <h5>Already have an account? No problem!</h5>
      <Link to='/login'>
        <button className='signupBtn'>Login</button>
      </Link>
    </div>
  )
}

export default SignupPage
