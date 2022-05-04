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
import { db } from '../Firebase/firebase';
import { set, ref, onValue, remove, update } from 'firebase/database';
var QRCode = require('qrcode.react');

const Booking = (props: any) => {
  const mapContainer = useRef(null) as any;
  const map = useRef(null) as any;
  const [lng, setLng] = useState(74.8847104);
  const [lat, setLat] = useState(32.6828032);
  const [zoom, setZoom] = useState(13);
  const [{ user }, dispatch] = useStateValue();
  const [modal, setModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [close, setClose] = useState(false);

  const Navigate = useNavigate();

  // firebase
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setClose(false);
      const data = snapshot.child('isClose').val();
      setClose(data);
    });
  }, []);
  // firebase

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

    console.log(user.coordinates);

    handleDirection(user.coordinates, [lat, lng]);
  }, [lat, lng, zoom]);

  let ticket = {
    id: user.email,
    passengers: user.pax,
    payment: localStorage.getItem('cost') ? false : true,
  };

  const handleEmergency = () => {
    update(ref(db, `/alerts`), {
      1: 'This is a test alert',
      0: 'Emergecy initiated from WB05C. [Yaksh Chopra]',
    });
  };

  return (
    <>
      {modal && <Modal amount={amount} setModal={setModal} />}
      <div className='relative'>
        <img
          className='fixed top-0 left-0 w-full z-0'
          src={gradient}
          alt='gradient_backdrop'
        />
        <Navbar />
        <div className='px-10'>
          <h1 className='text-xl font-medium -mt-4 relative'>
            Booking Details
          </h1>

          <div className='flex'></div>

          <Card
            key={props.active.bus}
            from={props.active.from}
            to={props.active.to}
            bus={props.active.bus}
            seatsLeft={props.active.seatsLeft}
            totalSeats={props.active.totalSeats}
            eta={props.active.eta}
            price={props.active.price}
            busStatus={props.active.busStatus}
            type={'booked'}
            isArrived={close}
          />

          {/* map */}
          <div className='w-full relative h-72 rounded-xl mt-6 bg-slate-100'>
            <div
              ref={mapContainer}
              className='w-full rounded-xl h-full my-auto object-cover absolute top-1/2 left-0 transform -translate-y-1/2'
            ></div>
          </div>

          {!close && (
            <p className='mt-6 text-center font-medium text-teal-700'>
              Bus {props.active.bus} is arriving to your place in
              {' ' + props.active.eta} minutes
            </p>
          )}

          <div className=' bg-blue-50 p-5 rounded-xl mt-6'>
            <div className='h-24 w-24 bg-black mx-auto'>
              <QRCode size={100} value={JSON.stringify(ticket)} />
            </div>
          </div>
          {!close ? (
            <div className='mt-6 mb-5 bg-black rounded-xl text-white w-full'>
              <Button
                size='xl'
                text='Cancel Booking'
                iconly={false}
                onClick={() => {
                  Navigate('/');
                }}
              />
            </div>
          ) : (
            <div className='my-3 mb-8 bg-red-500 rounded-xl text-white'>
              <Button
                size='xl'
                text='Emergency'
                iconly={false}
                onClick={() => {
                  handleEmergency();
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Booking;
