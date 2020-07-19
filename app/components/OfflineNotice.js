import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import colors from '../config/colors';
import { useNetInfo } from '@react-native-community/netinfo';

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No internet connection</Text>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 50,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: Constants.statusBarHeight,
  },
  text: {
    color: colors.white,
  },
});
export default OfflineNotice;
