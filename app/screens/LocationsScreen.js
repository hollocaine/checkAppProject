import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Holder from '../components/Holder';
import AppText from '../components/Text';
import Button from '../components/Button';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';
import locationsApi from '../api/locations';
import useApi from '../hooks/useApi';

function LocationsScreen({ navigation }) {
  const getLocationsApi = useApi(locationsApi.getLocations);

  useEffect(() => {
    getLocationsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getLocationsApi.loading} />
      <Screen style={styles.screen}>
        {getLocationsApi.error && (
          <>
            <AppText>Could not get the locations</AppText>
            <Button title="Retry" onPress={loadLocations} />
          </>
        )}

        <FlatList
          data={getLocationsApi.data}
          keyExtractor={(location, index) => 'key' + index}
          renderItem={({ item }) => (
            <Holder
              location_id={item.id}
              loc_name={item.loc_name}
              onPress={() => navigation.navigate(routes.QUESTIONS, item)}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default LocationsScreen;
