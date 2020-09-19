import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DestinationBooking from './components/Header/DestinationBooking/DestinationBooking';
import Header from './components/Header/Header';
import Home from './components/Header/Home/Home';
import Hotel from './components/Header/Hotel/Hotel';
import Login from './components/Header/Login/Login';
import travelInfo from './fakedata/travel-info';

export const TravelInfoContext = createContext();

function App() {
  const [destinationInfo, setDestinationInfo] = useState(travelInfo);
  return (
    <TravelInfoContext.Provider value={[destinationInfo, setDestinationInfo]}>
      <Router> 
        <Header/> 
        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/destination-booking/:destinationId">
            <DestinationBooking/>
          </Route>
          <Route path="/hotel/:placeId">
            <Hotel/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </TravelInfoContext.Provider>
  );
}

export default App;
