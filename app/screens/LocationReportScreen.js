import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import LevelPickerItem from '../components/LevelPickerItem';
import Button from '../components/Button';
import Screen from '../components/Screen';
import reportsApi from '../api/reports';
import FormImagePicker from '../components/forms/FormImagePicker';
import routes from '../navigation/routes';

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

function LocationReportScreen({ route, navigation }) {
  const now = moment(Date.now());
  const date = route.params.dateString;
  const location_id = route.params.id;
  const question_id = route.params.question_id;
  const loc_name = route.params.loc_name;
  const user_id = route.params.user_id;
  const [reportId, setReportId] = useState();
  const [hasDate, setHasDate] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const isFocused = useIsFocused();
  useEffect(() => {
    setHasDate(false);
    if (date !== undefined) {
      setNewDate(date);
      setHasDate(true);
    }
  }, [newDate, hasDate, isFocused]);

  const handleSubmit = async (report, { resetForm }) => {
    const loc_level = report.level.value;

    const result = await reportsApi.addReport(
      { ...report },
      loc_level,
      newDate
    );
    if (!result.ok) {
      return alert('Report was not saved');
    }
    const report_id = result.data.id;
    console.log(report_id);

    if (report_id > 0) {
      setReportId(reportId);
    }
    resetForm();
  };
  return (
    // <KeyboardAvoidingView
    //   behavior="position"
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}
    //   style={{ flex: 1 }}
    // >
    <Screen style={styles.container}>
      <Form
        initialValues={{
          location_id,
          date: now,
          question_id,
          user_id,
          loc_name,
          description: '',
          level: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        {!hasDate ? (
          <Button
            title="Expiry Date"
            onPress={() => navigation.navigate(routes.CALENDAR)}
          />
        ) : (
          <FormField
            maxLength={255}
            name="date"
            date={newDate}
            value={newDate}
          />
        )}
        <FormField maxLength={255} name="title" placeholder={loc_name} />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <Picker
          items={levels}
          name="level"
          numberOfColumns={3}
          PickerItemComponent={LevelPickerItem}
          placeholder="Level"
          width="50%"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  cam: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  cal: {
    flex: 1,
    width: 60,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});
export default LocationReportScreen;
