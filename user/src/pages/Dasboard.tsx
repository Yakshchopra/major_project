import React, { useEffect, useState } from 'react';
import gradient from '../assets/gradient.svg';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import { useStateValue } from '../store/stateProvider';
import { db } from '../Firebase/firebase';
import { onValue, ref } from 'firebase/database';
import { Navigate, useNavigate } from 'react-router-dom';

const TOKEN =
  'pk.eyJ1IjoieWFrc2hjaG9wcmEiLCJhIjoiY2tpZDNsa3J5MWY3bTJ0cnM1dGdybzh5aSJ9.VwV3tbcQ3g2HmowrEhuNcw';

const Dasboard = (props: any) => {
  const [{ user }, dispatch] = useStateValue();
  const [busList, setBusList] = useState([]) as any;

  const [distance, setDistance] = useState(11.5);

  const Navigate = useNavigate();

  useEffect(() => {
    let res = [] as any;
    onValue(ref(db), (snapshot) => {
      setBusList([]);
      res = [];
      const data = snapshot.child('busses').val();
      Object.keys(data).forEach((key) => res.push(data[key]));
      setBusList([...res]);
    });
  }, []);

  // geopositioning handler
  function showPosition(position: any) {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=pk.eyJ1IjoieWFrc2hjaG9wcmEiLCJhIjoiY2wwc2ZtNnhoMDQwNDNjbHpwbnlmcnUxMCJ9.SNs6lBMPjBfx36FByzpE1A`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: 'SET_USER',
          user: {
            ...user,
            location: data.features[1].place_name,
            coordinates: data.query,
          },
        });
      });
  }

  // geolocation handler
  useEffect(() => {
    let func = async () => {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(await showPosition);
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };

    func();
  }, []);

  return (
    <div className='relative'>
      <img
        className='absolute top-0 left-0 w-full z-0'
        src={gradient}
        alt='gradient_backdrop'
      />
      <Navbar />
      {/* location */}
      <div className='px-10 relative'>
        <div>
          <h1 className='text-xl font-medium'>Your current location</h1>
          <div className='rounded-xl bg-lightWhite p-4 mt-5'>
            <p className='w-11/12 overflow-x-auto whitespace-nowrap'>
              {/* {user.location} */}
              SRM University, Potheri, Kattankulathur, Tamil Nadu, India
            </p>
          </div>

          <h1 className='text-xl font-medium mt-8'>Busses near you</h1>

          <div>
            {busList?.map((item: any) => {
              return (
                <div
                  onClick={() => {
                    props.setBus({
                      bus: item.bus,
                      eta: (distance / item.speed) * 60,
                      from: item.from,
                      to: item.to,
                      totalSeats: 60,
                      seatsLeft: 60 - item.passengers,
                      price: item.price,
                      busStatus: item.status,
                      coordinates: item.coordinates,
                      isArrived: item.isClose,
                    });

                    Navigate('/details');
                  }}
                >
                  <Card
                    from={item.from}
                    to={item.to}
                    bus={item.bus}
                    seatsLeft={60 - item.passengers}
                    totalSeats={60}
                    eta={(distance / item.speed) * 60}
                    price={item.price}
                    busStatus={item.status}
                    type=''
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
