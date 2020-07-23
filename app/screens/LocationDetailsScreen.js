import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import colors from '../config/colors';
import LocationItem from '../components/lists/LocationItem';
import Text from '../components/Text';

function LocationDetailsScreen({ route }) {
  const location = route.params;
  return (
    <View>
      <View style={styles.detailsContainer}>
        <Text style={styles.loc_name}>{location.loc_name}</Text>
        <View style={styles.userContainer}>
          <LocationItem loc_name="Alan Flynn" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default LocationDetailsScreen;
