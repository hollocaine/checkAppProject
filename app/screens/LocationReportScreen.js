import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import Screen from '../components/Screen';
import FormImagePicker from '../components/forms/FormImagePicker';
import useLocation from '../hooks/useLocation';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  //images: Yup.array().min(1, 'Please select at least one image.'),
});

const categories = [
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

function LocationReportScreen({ locationId, questionId, ownerId }) {
  const location = useLocation();

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          locationId,
          questionId,
          ownerId,
          title: '',
          description: '',
          category: null,
          images: [],
        }}
        onSubmit={(values) => console.log(location)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
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
