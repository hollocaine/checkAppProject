import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import LevelPickerItem from '../components/LevelPickerItem';
import Screen from '../components/Screen';
import FormImagePicker from '../components/forms/FormImagePicker';
import useLocation from '../hooks/useLocation';
import locationsApi from '../api/locations';
import useApi from '../hooks/useApi';
import UploadScreen from './UploadScreen';

const validationSchema = Yup.object().shape({
  loc_name: Yup.string().required().min(1).label('Location'),
  user_id: Yup.number().required().min(1),
});

function LocationEditScreen({ route }) {
  const user_id = route.params.user_id;
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (location, { resetForm }) => {
    // setProgress(0);
    // setUploadVisible(true);
    // const result = await locationsApi.addLocation({ ...location }, (progress) =>
    //   setProgress(progress)
    // );
    const result = await locationsApi.addLocation({ ...location });
    if (!result.ok) {
      //setUploadVisible(false);
      return alert('Location was not saved');
    }
    resetForm();
  };
  return (
    <Screen style={styles.container}>
      {/* <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      /> */}
      <Form
        initialValues={{
          loc_name: '',
          user_id: user_id,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField maxLength={255} name="loc_name" placeholder="Location" />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default LocationEditScreen;
