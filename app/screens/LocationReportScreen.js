import React from 'react';
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

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  description: Yup.string().label('Description'),
  level: Yup.object().required().nullable().label('Level'),
  //images: Yup.array().min(1, 'Please select at least one image.'),
});

const levels = [
  {
    backgroundColor: '#fc5c65',
    icon: 'arrow-up-bold-circle-outline',
    label: 'Urgent',
    value: 1,
  },
  {
    backgroundColor: '#fd9644',
    icon: 'alert-circle',
    label: 'Medium',
    value: 2,
  },
  {
    backgroundColor: '#26de81',
    icon: 'arrow-down-circle',
    label: 'Low',
    value: 3,
  },
];

function LocationReportScreen({ location_id, question_id, user_id }) {
  const location = useLocation();

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          location_id,
          question_id,
          user_id,
          title: '',
          description: '',
          level: null,
          images: [],
        }}
        onSubmit={(values) => console.log(location)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <Picker
          items={levels}
          name="level"
          numberOfColumns={3}
          PickerItemComponent={LevelPickerItem}
          placeholder="Level"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
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
export default LocationReportScreen;
