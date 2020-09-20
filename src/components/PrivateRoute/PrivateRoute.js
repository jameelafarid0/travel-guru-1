import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { TravelInfoContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const {destineState, loggedUserState} = useContext(TravelInfoContext);
    const [loggedInUser, setLoggedInUser] = loggedUserState;
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;