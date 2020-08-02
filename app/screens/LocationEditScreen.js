import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from '../components/forms';
import locationsApi from '../api/locations';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
  loc_name: Yup.string().required().min(1).label('Location'),
  user_id: Yup.number().required().min(1),
});

function LocationEditScreen({ navigation, route }) {
  const user_id = route.params.user_id;
  const [sendToQuestion, setSendToQuestion] = useState(false);
  const [locationId, setLocationId] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fields, setFields] = useState([{ name: null }]);
  const [value, setValue] = useState();
  function handleAdd() {
    const names = [...fields];
    names.push({ name: null });
    setFields(names);
  }
  function handleChange(i, event) {
    const names = [...fields];
    names[i].name = event;
    setFields(names);
  }

  function handleRemove(i) {
    const names = [...fields];
    names.splice(i, 1);
    setFields(names);
  }

  const handleSubmit = async (location, { resetForm }) => {
    const result = await locationsApi.addLocation({ ...location });
    if (!result.ok) {
      return alert('Location was not saved');
    }
    const location_id = result.data.id;
    if (location_id > 0) {
      setSendToQuestion(true);
      setLocationId(location_id);
    }
  };
  return (
    <Screen style={styles.container}>
      {/* <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      /> */}
      {!sendToQuestion ? (
        <View>
          <View>
            <MaterialCommunityIcons
              color={colors.medium}
              name="plus-circle"
              size={50}
              onPress={() => handleAdd()}
            />
          </View>
          <Form
            initialValues={{
              name: [],
              user_id: user_id,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {fields.map((field, idx, value) => {
              return (
                <View key={`${field}-${idx}`} style={styles.inputBox}>
                  <FormField
                    maxLength={255}
                    name={'name[' + idx + ']'}
                    placeholder="Location"
                    onChangeText={(e) => handleChange(idx, e)}
                  />
                  <MaterialCommunityIcons
                    color={colors.medium}
                    name="close-circle"
                    size={50}
                    onPress={() => handleRemove(idx)}
                  />
                </View>
              );
            })}
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
