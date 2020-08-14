import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';

import Holder from '../components/Holder';
import AppText from '../components/Text';
import Button from '../components/Button';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import locationsApi from '../api/locations';

function LocationsScreen({ navigation }) {
  const getLocationsApi = useApi(locationsApi.getLocations);
  const auth = useAuth();
  const userId = auth.user.user_id;

  useEffect(() => {
    getLocationsApi.request();
  }, []);

  let data = [];
  for (let index = 0; index < getLocationsApi.data.length; index++) {
    if (getLocationsApi.data[index].user_id === userId) {
      data.push(getLocationsApi.data[index]);
    }
  }
  useEffect(() => {
    return () => {
      console.log('cleaned up');
    };
  }, []);
  return (
    <>
      <ActivityIndicator visible={getLocationsApi.loading} />
      <ImageBackground
        source={require('../assets/location.png')}
        style={styles.image}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Screen style={styles.screen}>
            {getLocationsApi.error && (
              <>
                <AppText>Could not get the locations</AppText>
                <Button title="Retry" onPress={getLocationsApi.request} />
              </>
            )}

            <FlatList
              data={data}
              keyExtractor={(location, index) => 'key' + index}
              renderItem={({ item }) => (
                <Holder
                  user_id={userId}
                  location_id={item.id}
                  loc_name={item.loc_name}
                  onPress={() =>
                    navigation.navigate(routes.LOCATION_REPORT, item)
                  }
                />
              )}
            />
          </Screen>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#e9f8f9',
  },
});

export default LocationsScreen;
