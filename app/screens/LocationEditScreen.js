import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import locationsApi from '../api/locations';

const validationSchema = Yup.object().shape({
  loc_name: Yup.string().required().min(1).label('Location'),
  user_id: Yup.number().required().min(1),
});

function LocationEditScreen({ navigation, route }) {
  const user_id = route.params.user_id;
  const [sendToQuestionEdit, setSendToQuestionEdit] = useState(false);
  const [locationId, setLocationId] = useState();

  const handleSubmit = async (location, { resetForm }) => {
    const result = await locationsApi.addLocation({ ...location });
    if (!result.ok) {
      return alert('Location was not saved');
    }
    resetForm({ location: '' });
    const location_id = result.data.id;
    if (location_id > 0) {
      setSendToQuestionEdit(true);
      setLocationId(location_id);
    }
  };
  return (
    <Screen style={styles.container}>
      {!sendToQuestionEdit ? (
        <View>
          <Form
            initialValues={{
              name: '',
              user_id: user_id,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormField maxLength={255} name="loc_name" placeholder="Location" />
            <SubmitButton title="Post" />
          </Form>
        </View>
      ) : (
        navigation.navigate('QuestionEdit', {
          location_id: locationId,
          user_id,
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 20,
  },
});
export default LocationEditScreen;
