import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Locations from '../screens/LocationsScreen';
import LocationDetailsScreen from '../screens/LocationDetailsScreen';
import Questions from '../screens/QuestionsScreen';
import LocationReport from '../screens/LocationReportScreen';
import ReportsScreen from '../screens/ReportsScreen';
import QuestionsEdit from '../screens/QuestionsEditScreen';
import ReportDetailsScreen from '../screens/ReportDetailsScreen';
import CalendarScreen from '../screens/CalendarScreen';
const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Locations" component={Locations} />
    <Stack.Screen name="Questions" component={Questions} />
    <Stack.Screen name="Add Report" component={LocationReport} />
    <Stack.Screen name="Reports" component={ReportsScreen} />
    <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} />
    <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
    <Stack.Screen name="QuestionEdit" component={QuestionsEdit} />
    <Stack.Screen name="Calendar" component={CalendarScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
