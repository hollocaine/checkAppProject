import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Text from '../components/Text';

function UploadScreen(props) {
  return (
    <Modal>
      <View style={styles.container}>
        <Text>Ok</Text>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default UploadScreen;
