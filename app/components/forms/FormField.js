import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import { StyleSheet, View } from 'react-native';
import TextInput from '../TextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({ name, width, date, ...otherProps }) {
  const [hasArr, setHasArr] = useState(false);
  const [dataArr, setDataArr] = useState([{}]);

  useEffect(() => {
    if (typeof otherProps.values === 'object') {
      setHasArr(true);
    }
  }, []);

  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      {!hasArr ? (
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          date={date}
          width={width}
          {...otherProps}
        />
      ) : (
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => {
            const question = {
              question: text,
            };
            values = {
              questions: [setDataArr(...name), question],
            };
          }}
        />
      )}
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
