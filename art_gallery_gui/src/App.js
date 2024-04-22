/*
 * Name: Abhinav Sharma
 * Student ID: 2210994752
 * Unit: SIT331
 * Task: 5.2HD 
 */

import './App.css';
import { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import HomePage from './routes/HomePage';
import ArtistList from './routes/ArtistList';
import NotFoundPage from './routes/NotFoundPage'
import Login from './routes/Login'
import SignUp from './routes/SignUp';
import Profile from './routes/ProfilePage'
import ArtifactList from './routes/ArtifactList';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const loginUser = () => {
    setLoggedIn(true);
  };

  const logoutUser = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage loggedIn={loggedIn}/>}/>
        <Route path='/login' element={<Login loginUser={loginUser}/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/artists' element={loggedIn ? <ArtistList/> : <Navigate to="/login" />}/>
        <Route path='/artifacts' element={loggedIn ? <ArtifactList/> : <Navigate to="/login" />}/>
        <Route path='/profile' element={loggedIn ? <Profile setLoggedIn={logoutUser}/> : <Navigate to="/login" />}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
