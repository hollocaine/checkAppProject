import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Screen from '../components/Screen';
import questionsApi from '../api/questions';
import colors from '../config/colors';

//Note: Not using validation Schema here as it is not using Formik below.

const validationSchema = Yup.object().shape({
  question: Yup.string().required().min(1).label('Question'),
  location_id: Yup.number().required().min(1),
  user_id: Yup.number().required().min(1),
});

function QuestionsEditScreen({ navigation, route }) {
  const scrollView = useRef();
  const user_id = route.params.user_id;
  const location_id = route.params.location_id;
  const [fields, setFields] = useState([
    { name: '', text: '', user_id, location_id },
  ]);

  function handleAdd() {
    const questions = [...fields];
    questions.push({ ...questions, user_id, location_id });
    setFields(questions);
  }

  function handleRemove(i) {
    const questions = [...fields];
    questions.splice(i, 1);
    setFields(questions);
  }

  function handleChange(i, event) {
    const questions = [...fields];
    questions[i].text = event.nativeEvent.text;
    setFields(questions);
  }

  const handleSubmit = async () => {
    const questions = [...fields];
    console.log(questions);
    //Note: Logging output in the questionsApi now to validate it is being sent through.
    const result = await questionsApi.addQuestion({
      ...questions,
    });
    console.log(result);
    //Note: The result is coming back as a fail, probably something to do with the expected input to the api endpoint
    if (!result.ok) {
      return alert('Question was not saved');
    } else {
      return alert('Question was saved');
    }
  };
  // const handleSubmit = async (question, { resetForm }) => {
  //   const result = await questionsApi.addQuestion({ ...question });
  //   if (!result.ok) {
  //     return alert('Question was not saved');
  //   }
  //   const getQuestionsApi = useApi(questionsApi.getQuestions);
  //   resetForm();
  // };
  return (
    <Screen style={styles.container}>
      <View>
        <MaterialCommunityIcons
          color={colors.medium}
          name="plus-circle"
          size={50}
          onPress={() => handleAdd()}
        />
      </View>
      <ScrollView
        ref={scrollView}
        vertical
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {fields.map((field, idx, value) => {
          return (
            <View key={`${field}-${idx}`} style={styles.inputBox}>
              <TextInput
                name={'question[' + idx + ']'}
                defaultValue={field.text}
                placeholder="Question"
                onChange={(e) => handleChange(idx, e)}
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
        <Button title="Post" onPress={handleSubmit} />
      </ScrollView>
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
    width: '88%',
    marginLeft: 20,
  },
});
export default QuestionsEditScreen;
