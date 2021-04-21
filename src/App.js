import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './Login';
import {useStateValue} from './StateProvider';

function App() {

  const [{user},dispatch]=useStateValue();
  

  return (
    <div className="app">
     
        <div className="app__body">
        {!user?(
        <Login />
      ):(
        <Router>
           <Sidebar />

          <Switch>  
           <Route path="/groups/:groupId">
                <Chat />
            </Route>

          </Switch>
        </Router>
         )}
    </div>
     
          
   </div>
  );
}

export default App;
