import React from 'react';
import { Table, Tag, Space } from 'antd';
import { db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import 'antd/dist/antd.css';
import { useEffect } from 'react';

const TOKEN =
  'pk.eyJ1IjoieWFrc2hjaG9wcmEiLCJhIjoiY2tpZDNsa3J5MWY3bTJ0cnM1dGdybzh5aSJ9.VwV3tbcQ3g2HmowrEhuNcw';
// data
const columns = [
  {
    title: 'Bus No.',
    dataIndex: 'bus',
    key: 'bus',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Source',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'Destination',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: 'Passengers',
    dataIndex: 'passengers',
    key: 'passengers',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Revenue',
    dataIndex: 'price',
    key: 'revenue',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text: any) => <Tag color='cyan'>{text}</Tag>,
  },
  {
    title: 'Voilations',
    key: 'voilations',
    dataIndex: 'voilations',
    render: (text: any) => <Tag color='red'>{text}</Tag>,
  },
];

const TableList = () => {
  const [busList, setBusList] = React.useState([]) as any;

  React.useEffect(() => {
    let res = [] as any;
    onValue(ref(db), (snapshot) => {
      setBusList([]);
      res = [];
      const data = snapshot.child('busses').val();
      Object.keys(data).forEach((key) => res.push(data[key]));
      setBusList(res);
    });
  }, []);

  return <Table columns={columns} dataSource={busList} />;
};

export default TableList;
