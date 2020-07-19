import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Holder from '../components/Holder';
import colors from '../config/colors';
import routes from '../navigation/routes';
import Screen from '../components/Screen';

const locations = [
  {
    loc_id: 1,
    loc_name: 'Office',
    ownerId: 1,
  },
  {
    loc_id: 2,
    loc_name: 'Warehouse',
    ownerId: 1,
  },
];

function LocationsScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={locations}
        keyExtractor={(location) => location.loc_id.toString()}
        renderItem={({ item }) => (
          <Holder
            loc_name={item.loc_name}
            onPress={() => navigation.navigate(routes.QUESTIONS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default LocationsScreen;
