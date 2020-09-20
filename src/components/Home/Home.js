import React, { useContext } from 'react';
import { TravelInfoContext } from '../../App';
import Destination from '../Destination/Destination';
import './Home.css'

const Home = () => {
    const {destineState, loggedUserState} = useContext(TravelInfoContext);
    const [destinationInfo, setDestinationInfo] = destineState;
    return (
        <div>
            <h2>Select a booking destination</h2>
            <div className="main-container">
                {
                    destinationInfo.map(place =><Destination place={place}></Destination>)
                }
            </div>
        </div>
    );
};

export default Home;