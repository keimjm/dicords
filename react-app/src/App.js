import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage';
import { getAllServers } from './store/server';
import SplashPage from './components/splashpage/SplashPage';
import { getAllUsers } from './store/user';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const servers = useSelector(state => state.servers)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllServers());
    dispatch(getAllUsers())
  }, [dispatch]);

  if (!loaded || !servers) {
    return null;
  }

  return (
    <div className="app">
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <SplashPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/channels' exact={true} >
          <HomePage/>
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
