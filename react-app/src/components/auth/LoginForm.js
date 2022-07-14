import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = async (e) => {
    e.preventDefault();

    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    }

  }

  if (user) {
    return <Redirect to='/channels/@me' />;
  }

  return (
    <div className='login-signup-background'>
    <div className='login-signup-form-container'>
      <div className='login-signup-header'>
          <h3>Welcome Back!</h3>
          <div>We're glad to see you again</div>
        </div>
    <form className='login-signup-form' onSubmit={onLogin}>
        {errors.map((error, ind) => (
          <div className='errors'>
          <div key={ind}>{error}</div>
          </div>
        ))}
      <div className='login-signup-form-input'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          required
          onChange={updateEmail}
        />
      </div>
      <div className='login-signup-form-input'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={updatePassword}
        />
        </div>
        <button className='login-button' type='submit'>Login</button>
        <button className='login-button' type="button" onClick={handleDemo}>Demo User</button>
      <div className='link-signup'>
          <span>Need an Account? <a href='/sign-up'> Register</a></span>
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
