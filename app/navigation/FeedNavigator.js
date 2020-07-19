import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Locations from '../screens/LocationsScreen';
import LocationDetailsScreen from '../screens/LocationDetailsScreen';
import Questions from '../screens/QuestionsScreen';
import LocationReport from '../screens/LocationReportScreen';
const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Locations" component={Locations} />
    <Stack.Screen name="Questions" component={Questions} />
    <Stack.Screen name="Add Report" component={LocationReport} />
    <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
