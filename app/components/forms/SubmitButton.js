import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import Button from '../Button';

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} />;
}

const styles = StyleSheet.create({
  setSize: {
    width: '50%',
    backgroundColor: 'pink',
    color: 'green',
  },
});
export default SubmitButton;
