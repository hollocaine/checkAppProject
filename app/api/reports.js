import client from './client';
const endpoint = '/reports';

const getReports = () => client.get(endpoint);

const addReport = (report, loc_level, date) => {
  const data = new FormData();
  data.append('title', report.title);
  data.append('description', report.description);
  data.append('user_id', report.user_id);
  data.append('location_id', report.location_id);
  data.append('question_id', Number(report.question_id));
  data.append('date', date);
  data.append('level', loc_level);
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
