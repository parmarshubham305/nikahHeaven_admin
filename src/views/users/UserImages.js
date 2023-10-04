import React, { useState, useEffect } from 'react';
import dataProvider from './dataprovider';

const UserImages = ({ userId }) => {
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    dataProvider.getUserImages(userId).then((images) => {
      setUserImages(images.data);
    });
  }, [userId]);

  return (
    <div>
      <h2>Images for User ID: {userId}</h2>
      <ul>
        {userImages.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={`Image ${image.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserImages;

