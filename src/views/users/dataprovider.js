import axios from 'axios';

const cloudinaryBaseUrl = 'https://api.cloudinary.com/v1_1/dyv2pftfd';
const cloudinaryApiKey = '724767394394617';





const dataProvider = {
  getAllUserIds: () =>
    axios
      .get(`${cloudinaryBaseUrl}/}`, {
        headers: {
          Authorization: `Bearer ${cloudinaryApiKey}`,
        },
      // })
      // .then((response) => {
      //   return response.data.folders.map((folder) => ({ id: folder.name }));
      // }),
       } ),

  getUserImages: (userId) =>
    axios
      .get(`${cloudinaryBaseUrl}/resources/image/${userId}`, {
        headers: {
          Authorization: `Bearer ${cloudinaryApiKey}`,
        },
      })
      .then((response) => {
        return {
          data: response.data.resources.map((image) => ({ id: image.public_id, url: image.url })),
        };
      }),
};

export default dataProvider;
