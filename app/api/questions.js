import client from './client';
const endpoint = '/questions';

const getQuestions = () => client.get(endpoint);

const addQuestion = (question) => {
  const data = new FormData();
  data.append('location_id', question.location_id);
  data.append('user_id', question.user_id);
  data.append('question', question.question);

  return client.post(endpoint, data);
};
export default {
  getQuestions,
  addQuestion,
};
