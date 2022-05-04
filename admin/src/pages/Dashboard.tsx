import React from 'react';
import Nav from '../components/Nav';
import 'antd/dist/antd.css';
import TableList from '../components/TableList';
import Notifications from '../components/Notifications';
import { db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import { message } from 'antd';
import { useEffect } from 'react';

const Dashboard = () => {
  const [select, setSelect] = React.useState('list');

  const [notice, setNotice] = React.useState([]);

  let temp = 0;

  React.useEffect(() => {
    let res = [] as any;
    onValue(ref(db), (snapshot) => {
      setNotice([]);
      res = [];
      const data = snapshot.child('alerts').val();
      Object.keys(data).forEach((key) => res.push(data[key]));
    });

    temp++;
    console.log(temp);
  }, []);

  return (
    <div className='h-screen w-screen overflow-hidden p-10'>
      <Nav select={select} setSelect={setSelect} />

      <div className='flex gap-16 p-8 rounded-xl my-8 bg-gray-50'>
        <div className='w-3/4'>
          <p className='text-xl font-semibold'>Active buses</p>
          <TableList />
        </div>
        <div className='w-1/4'>
          <p className='text-xl font-semibold'>Notifications</p>
          <Notifications />
        </div>
      </div>

      {/* Table for the list */}
      {/* {select === 'list' && <div className='px-16 mt-12'></div>}

      {select === 'notice' && <div className='px-36 mt-12'></div>} */}

      {/* alerts */}
    </div>
  );
};

export default Dashboard;
