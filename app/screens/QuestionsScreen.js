import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Holder from '../components/Holder';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import ListQuestions from '../components/lists/ListQuestions';
import questionsApi from '../api/questions';
import useApi from '../hooks/useApi';
import { connect } from 'formik';
import { cos } from 'react-native-reanimated';

function QuestionsScreen({ route, navigation }) {
  const location_id = route.params.id;
  const getQuestionsApi = useApi(questionsApi.getQuestions);
  const [hasQuestions, setHasQuestions] = useState(true);
  useEffect(() => {
    getQuestionsApi.request();
  }, []);

  return (
    <View style={styles.container}>
      {hasQuestions ? (
        <FlatList
          data={getQuestionsApi.data}
          renderItem={({ item }) =>
            item.location_id === location_id.toString() && item.question !== ''
              ? item.questions.map((v, i) => (
                  <ListQuestions
                    key={i}
                    question={v.question}
                    question_id={v.question_id}
                    user_id={item.user_id}
                    location_id={item.location_id}
                  />
                ))
              : null
          }
          keyExtractor={(item, index) => 'key' + index}
        />
      ) : (
        navigation.navigate(routes.QUESTION_EDIT, {
          user_id: '1',
          location_id: location_id,
        })
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.border,
    borderWidth: 5,
  },
  questPos: {
    marginBottom: 3,
    marginLeft: 20,
    marginRight: 15,
    fontSize: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#e9f8f9',
  },
  buttonHolder: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
});
export default QuestionsScreen;
