import client from './client';
const endpoint = '/levels';

const getLevels = () => client.get(endpoint);

export default {
  getLevels,
};
