import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import colors from '../config/colors';
import ReportItem from '../components/lists/ReportItem';
import Text from '../components/Text';

function ReportDetailsScreen({ route }) {
  const reporting = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    >
      <Image
        style={styles.image}
        preview={{ uri: reporting.images[0].thumbnailUrl }}
        tint="light"
        uri={reporting.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{reporting.title}</Text>
        <Text style={styles.description}>{reporting.description}</Text>
        <Text style={styles.date}>Expiry date {reporting.date}</Text>
        <View style={styles.userContainer}>
          <ReportItem
            image={require('../assets/alan.jpg')}
            title="Alan Flynn"
            subTitle="Report"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
  description: {
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

export default ReportDetailsScreen;
