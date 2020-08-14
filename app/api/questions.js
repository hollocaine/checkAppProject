import client from './client';
const endpoint = '/questions';

const getQuestions = () => client.get(endpoint);

const addQuestion = (questions, user_id, location_id) => {
  console.log(questions);
  console.log('Submitting Multiple Questions');
  const data = new FormData();
  // data.append('location_id', location_id);
  // data.append('user_id', user_id);

  for (const key in questions) {
    if (questions.hasOwnProperty(key)) {
      if (typeof questions[key].text !== undefined) {
        if (questions[key].text !== undefined) {
          data.append('questions', {
            question: questions[key].text,
            user_id: questions[key].user_id,
            location_id: questions[key].location_id,
          });
        }
      }
    }
  }
  console.log(data);
  return client.post(endpoint, data);
};
export default {
  getQuestions,
  addQuestion,
};
