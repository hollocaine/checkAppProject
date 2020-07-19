import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function ListQuestions({ question, locationId, ownerId, questionId }) {
  const navigation = useNavigation();
  return (
    <View style={styles.questPos}>
      <Text>{question}</Text>
      <View style={styles.buttonHolder}>
        <View style={{ width: 100, marginRight: 10 }}>
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={50}
            color="dodgerblue"
            onPress={() => {
              console.log(locationId);
            }}
          />
        </View>
        <View style={{ width: 100, marginRight: 10 }}>
          <MaterialCommunityIcons
            name="close-box"
            size={50}
            color="#ff4500"
            onPress={() =>
              navigation.navigate('Add Report', {
                locationId,
                ownerId,
                questionId,
              })
            }
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <Button
            title="N/A"
            color="green"
            onPress={() => {
              console.log(ownerId);
            }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  questPos: {
    marginBottom: 3,
    marginLeft: 20,
    marginRight: 15,
    fontSize: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  buttonHolder: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
export default ListQuestions;
