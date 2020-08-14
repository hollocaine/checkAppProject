import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Holder from '../components/Holder';
import colors from '../config/colors';
import routes from '../navigation/routes';
import ListQuestions from '../components/lists/ListQuestions';
import questionsApi from '../api/questions';
import useApi from '../hooks/useApi';

function QuestionsScreen({ route, navigation }) {
  const location_id = route.params.id;
  const userId = route.params.user_id;
  const getQuestionsApi = useApi(questionsApi.getQuestions);
  useEffect(() => {
    getQuestionsApi.request();
  }, []);
  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);
  let data = [];
  if (getQuestionsApi.data.length === 0) {
    navigation.navigate(routes.QUESTION_EDIT, {
      location_id,
      userId,
    });
  } else {
    for (let index = 0; index < getQuestionsApi.data.length; index++) {
      if (getQuestionsApi.data[index].user_id === userId) {
        data.push(getQuestionsApi.data[index]);
      }
    }
  }

  return (
    <ImageBackground
      source={require('../assets/extinguisher.png')}
      style={styles.image}
    >
      <View style={styles.container}>
        <FlatList
          data={getQuestionsApi.data}
          renderItem={({ item }) =>
            item.location_id === location_id
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
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
