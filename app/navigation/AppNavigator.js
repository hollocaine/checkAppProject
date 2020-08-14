import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Notifications } from 'expo';
import { Platform } from 'react-native';
import * as Permissions from 'expo-permissions';

import AccountNavigator from './AccountNavigator';
import FeedNavigator from './FeedNavigator';
import LocationEditScreen from '../screens/LocationEditScreen';
import NewLocationButton from './NewLocationButton';
import routes from './routes';
import useAuth from '../auth/useAuth';
import useNotifications from '../hooks/useNotifications';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const auth = useAuth();
  const userId = auth.user.user_id;
  useNotifications();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LocationEdit"
        component={LocationEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewLocationButton
              onPress={() =>
                navigation.navigate(routes.LOCATION_EDIT, { user_id: userId })
              }
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
