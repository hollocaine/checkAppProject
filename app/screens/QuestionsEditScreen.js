import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import questionsApi from '../api/questions';
import colors from '../config/colors';
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
  question: Yup.string().required().min(1).label('Question'),
  location_id: Yup.number().required().min(1),
  user_id: Yup.number().required().min(1),
});

function QuestionsEditScreen({ navigation, route }) {
  const user_id = route.params.user_id;
  const location_id = route.params.location_id;
  const [fields, setFields] = useState([{ name: null }]);

  function handleAdd() {
    const questions = [...fields];
    questions.push({ question: null });
    setFields(questions);
  }
  function handleChange(i, event) {
    const questions = [...fields];
    questions[i].question = event;
    setFields(questions);
  }

  function handleRemove(i) {
    const questions = [...fields];
    questions.splice(i, 1);
    setFields(questions);
  }
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
      <View>
        <MaterialCommunityIcons
          color={colors.medium}
          name="plus-circle"
          size={50}
          onPress={() => handleAdd()}
        />
      </View>
      <Form
        initialValues={{
          question: '',
          user_id,
          location_id,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {fields.map((field, idx, value) => {
          return (
            <View key={`${field}-${idx}`} style={styles.inputBox}>
              <FormField
                maxLength={255}
                name={'name[' + idx + ']'}
                placeholder="Question"
                value={value}
                onChangeText={(e) => handleChange(idx, e)}
              />
              <MaterialCommunityIcons
                color={colors.medium}
                name="close-circle"
                size={50}
                onPress={() => handleRemove(idx)}
              />
            </View>
          );
        })}
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
  },
});
export default QuestionsEditScreen;
