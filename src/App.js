import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,Link
} from "react-router-dom";
import DestinationBooking from './components/DestinationBooking/DestinationBooking';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Hotel from './components/Hotel/Hotel';
import Login from './components/Login/Login';
import NoMatch from './components/NoMatch/NoMatch';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import travelInfo from './fakedata/travel-info';

export const TravelInfoContext = createContext();

function App(props) {
  const [destinationInfo, setDestinationInfo] = useState(travelInfo);
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <TravelInfoContext.Provider 
    value={{destineState:[destinationInfo, setDestinationInfo], loggedUserState:[loggedInUser,setLoggedInUser]}}>
      {props.children}
      <Router> 
        <Header/> 
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/destination-booking/:destinationId">
            <DestinationBooking/> 
          </Route>
          <PrivateRoute path="/hotel/:placeId">
            <Hotel/>
          </PrivateRoute>
          <Route path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
    </TravelInfoContext.Provider>
  );
}

export default App;
