import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Holder from '../components/Holder';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import ListQuestions from '../components/lists/ListQuestions';

function QuestionsScreen({ route }) {
  const location = route.params;
  const DATA = [
    {
      location_id: '1',
      questions: [
        {
          question_id: '1',
          question: 'Is there a fire extinguisher?',
        },
        {
          question_id: '2',
          question: 'Is there a fire alarm?',
        },
        {
          question_id: '3',
          question: 'Is there a fire hose?',
        },
      ],
    },
    {
      location_id: '2',
      questions: [
        {
          question_id: '1',
          question: 'Is there a bigger fire extinguisher?',
        },
        {
          question_id: '2',
          question: 'Is there a smaller fire alarm?',
        },
        {
          question_id: '3',
          question: 'Is there a larger fire hose?',
        },
      ],
    },
    {
      location_id: '3',
      questions: [
        {
          question_id: '1',
          question: 'Get the  hell out theres a fire?',
        },
        {
          question_id: '2',
          question: 'Any marshmallows?',
        },
        {
          question_id: '3',
          question: 'Put the kettle on?',
        },
        {
          question_id: '4',
          question: 'Call the fire brigade?',
        },
      ],
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) =>
          item.location_id === location.loc_id.toString()
            ? item.questions.map((v, i) => (
                <ListQuestions
                  key={i}
                  question={v.question}
                  question_id={v.question_id}
                  user_id={item.user_id}
                  locationId={item.locationId}
                />
              ))
            : null
        }
        keyExtractor={(item, index) => 'key' + index}
      />
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
