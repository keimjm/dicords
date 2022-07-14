import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
      else {
        <Redirect to='/channels/@me' />
      }
    }
    else {
      setErrors(['* Passwords must match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-signup-background'>
    <div className='login-signup-form-container'>
      <div className='login-signup-header'>
        <h2>Create an Account</h2>
      </div>
    <form className='login-signup-form' onSubmit={onSignUp}>
    {errors.map((error, ind) => (
          <div className='errors'>
          <div key={ind}>{error}</div>
          </div>
        ))}
        <div className='login-signup-form-input'>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className='login-signup-form-input'>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className='login-signup-form-input'>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className='login-signup-form-input'>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='login-button' type='submit'>Sign Up</button>
      <div className='link-signup'>
          <span><a href='/login'>Already have an Account?</a></span>
      </div>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
