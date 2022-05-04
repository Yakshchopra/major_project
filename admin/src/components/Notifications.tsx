import React from 'react';
import { Alert, message } from 'antd';
import { db } from '../firebase/firebase';
import { onValue, ref } from 'firebase/database';
import 'antd/dist/antd.css';

const Notifications = () => {
  const [list, setList] = React.useState([]) as any;

  React.useEffect(() => {
    let res = [] as any;
    onValue(ref(db), (snapshot) => {
      setList([]);
      res = [];
      const data = snapshot.child('alerts').val();
      Object.keys(data).forEach((key) => res.push(data[key]));
      setList(res);
    });
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      {list.map((element: any) => {
        return (
          <Alert
            message={element}
            type={element.includes('voilat') ? 'error' : 'info'}
            showIcon
          />
        );
      })}
    </div>
  );
};

export default Notifications;
