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
import DirectMessage from './components/DirectMessage';
import HomePage from './components/HomePage';
import { getAllServers } from './store/server';
import SplashPage from './components/splashpage/SplashPage';
import { getAllUsers } from './store/user';
import Server from './components/servers/Server';
import Sidebar from './components/servers/Sidebar';
import FriendList from './components/FriendList'
import { Modal } from './context/Modal';
import Chat from './components/chat/ChatPage';
import ChatChannel from './components/chat/ChatChannel';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const servers = useSelector(state => state.servers)
  const users = useSelector(state => state.users)

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

  if (!users) return null

  return (
    <div className="app">
    <BrowserRouter>
      {/* <NavBar /> */}
      <Route path='/' exact={true} >
          <SplashPage/>
        </Route>


      <ProtectedRoute path='/channels/' >
          <Sidebar/>
        </ProtectedRoute>
        <Switch>
        <ProtectedRoute path='/channels/@me' >
        {/* <Sidebar /> */}
        </ProtectedRoute>
        </Switch>

      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute exact={true} path='/channels/@me/:messageId' >
          <Chat/>
        </ProtectedRoute>
        <ProtectedRoute exact={true}  path='/channels/:serverId/:channelId' >
          <ChatChannel />
        </ProtectedRoute>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>


      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
