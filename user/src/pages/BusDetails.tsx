import React, { useEffect, useRef, useState } from 'react';
import gradient from '../assets/gradient.svg';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useStateValue } from '../store/stateProvider';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const BusDetails = (props: any) => {
  const mapContainer = useRef(null) as any;
  const map = useRef(null) as any;
  const [lng, setLng] = useState(74.8847104);
  const [lat, setLat] = useState(32.6828032);
  const [zoom, setZoom] = useState(5);
  const [{ user, activeBus }, dispatch] = useStateValue();
  const [modal, setModal] = useState(false);
  const [pax, setPax] = useState(1);
  const [amount, setAmount] = useState(0);

  const Navigate = useNavigate();

  mapboxgl.accessToken =
    'pk.eyJ1IjoieWFrc2hjaG9wcmEiLCJhIjoiY2wwc2ZtNnhoMDQwNDNjbHpwbnlmcnUxMCJ9.SNs6lBMPjBfx36FByzpE1A';

  const handleDirection = (source: any, destination: any) => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${source[0]},${source[1]};${destination[1]},${destination[0]}?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoieWFrc2hjaG9wcmEiLCJhIjoiY2tpZDNsa3J5MWY3bTJ0cnM1dGdybzh5aSJ9.VwV3tbcQ3g2HmowrEhuNcw`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: 'mapbox://styles/yakshchopra/ckyvdk1gl003414lcxqvhntm7',
      center: [lng, lat],
      zoom: zoom,
    }).addControl(geolocate);

    map.current.on('load', () => {
      geolocate.trigger();
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([80.127457, 12.922915])
      .addTo(map.current);
    // handleDirection(user.coordinates, [lat, lng]);
  }, [lat, lng, zoom]);

  return (
    <>
      {modal && <Modal amount={amount} setModal={setModal} />}
      <div className='relative'>
        <img
          className='absolute top-0 left-0 w-full z-0'
          src={gradient}
          alt='gradient_backdrop'
        />
        <Navbar />
        <div className='px-10'>
          <h1 className='text-xl font-medium -mt-4'>Bus Details</h1>
          <Card
            type=''
            key={props.active.bus}
            from={props.active.from}
            to={props.active.to}
            bus={props.active.bus}
            seatsLeft={props.active.seatsLeft}
            totalSeats={props.active.totalSeats}
            eta={props.active.eta}
            price={props.active.price}
            busStatus={props.active.busStatus}
          />

          {/* map */}
          <div className='w-full relative h-72 rounded-xl mt-6 bg-slate-100'>
            <div
              ref={mapContainer}
              className='w-full rounded-xl h-full my-auto object-cover absolute top-1/2 left-0 transform -translate-y-1/2'
            ></div>
          </div>

          <input
            value={pax}
            className='p-4 w-full border relative border-gray-200 outline-none focus:outline-none focus:ring focus:border-teal-100 rounded-xl mt-5'
            placeholder='Enter number of passengers'
            onChange={(e: any) => setPax(e.target.value)}
          />

          <div className='mt-3 bg-black rounded-xl text-white'>
            <Button
              size='xl'
              text='Pay Manually'
              iconly={false}
              onClick={() => {
                Navigate('/payment');
              }}
            />
          </div>
          <div className='my-3 mb-8 bg-teal-400 rounded-xl text-white'>
            <Button
              size='xl'
              text='Auto Deduct'
              iconly={false}
              onClick={() => {
                dispatch({
                  type: 'SET_USER',
                  user: { ...user, pax: pax },
                });
                setAmount(pax * props.active.price);
                setModal(true);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BusDetails;
