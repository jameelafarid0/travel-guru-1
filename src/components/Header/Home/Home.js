import React, { useContext } from 'react';
import { TravelInfoContext } from '../../../App';
import Destination from '../Destination/Destination';
import './Home.css'

const Home = () => {
    const [destinationInfo, setDestinationInfo] = useContext(TravelInfoContext);
    return (
        <div>
            <h2 className="heading">Select a booking destination</h2>
            <div className="main-container">
                {
                    destinationInfo.map(place =><Destination place={place}></Destination>)
                }
            </div>
        </div>
    );
};

export default Home;