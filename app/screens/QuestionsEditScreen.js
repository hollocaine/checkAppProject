import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import LevelPickerItem from '../components/LevelPickerItem';
import Screen from '../components/Screen';
import FormImagePicker from '../components/forms/FormImagePicker';
import questionsApi from '../api/questions';
import useApi from '../hooks/useApi';
import UploadScreen from './UploadScreen';

const validationSchema = Yup.object().shape({
  question: Yup.string().required().min(1).label('Question'),
  location_id: Yup.number().required().min(1),
  user_id: Yup.number().required().min(1),
});

function QuestionsEditScreen({ navigation, route }) {
  const user_id = route.params.user_id;
  const location_id = route.params.location_id;
  const handleSubmit = async (question, { resetForm }) => {
    const result = await questionsApi.addQuestion({ ...question });
    if (!result.ok) {
      return alert('Question was not saved');
    }
    const getQuestionsApi = useApi(questionsApi.getQuestions);
    resetForm();
  };
  return (
    <Screen style={styles.container}>
      {/* <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      /> */}
      <Form
        initialValues={{
          question: '',
          user_id,
          location_id,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="question" placeholder="Question" />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default QuestionsEditScreen;
