import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hotelInfo from '../../../fakedata/hotel-info';
import './Hotel.css';

const Hotel = () => {
    const {placeId} = useParams();

    const [hotel, setHotel] = useState(hotelInfo);
    const [hotelCard, setHotelCard] = useState([]);

    useEffect(() => {
        const matchedPlace = hotel.filter((hotel => hotel.pId.toString() === placeId));
        setHotelCard(matchedPlace);
    }, [hotel, placeId]);

    return (
        <div>
            <div className="hotel-name">
                <h5>252 stays April 13-17 3 guests</h5>
                <p>Stay in destination place</p>
            </div>
            {
                hotelCard.map(hotel => 
                    <div >
                        <div className="hotel-container">
                            <div>
                                <img src={hotel.image} alt=""/>
                            </div>
                            <div className="hotel-detail">
                                <h4>{hotel.hotelName}</h4>
                                <p>4 guests 2 bedrooms 2 beds 2 baths</p>
                                <p>Wif Air conditioning Kitchen</p>
                                <p>Cancellation flexibility available</p>
                                
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Hotel;