import client from './client';
const endpoint = '/reports';

const getReports = () => client.get(endpoint);

const addReport = (report) => {
  const data = new FormData();
  data.append('title', report.title);
  data.append('description', report.description);
  data.append('user_id', report.user_id);
  data.append('location_id', report.location_id);
  data.append('question_id', report.question_id);
  data.append('level', report.level);
  report.images.forEach((image, index) =>
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    })
  );
  return client.post(endpoint, data);
};
export default {
  getReports,
  addReport,
};
