import client from './client';
const endpoint = '/locations';

const getLocations = () => client.get(endpoint);

const addLocation = (location) => {
  const data = new FormData();
  data.append('loc_name', location.loc_name);
  data.append('user_id', location.user_id);

  //  return client.post(endpoint, data, {
  //    onUploadProgress: (progress) =>
  //      onUploadProgress(progress.loaded / progress.total),
  //  });
  return client.post(endpoint, data);
};
export default {
  getLocations,
  addLocation,
};
