import React, { useState, useEffect } from 'react';
import dataProvider from './dataprovider';

const UserList = () => {
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    dataProvider.getAllUserIds().then((users) => {
      setUserIds(users);
    });
  }, []);

  return (
    <div>
      <h2>User IDs</h2>
      <ul>
        {userIds.map((user) => (
          <li key={user.id}>{user.id}</li>

        ))}
      </ul>
    </div>
  );
};

export default UserList;
