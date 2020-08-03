import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import routes from '../navigation/routes';

const CalendarScreen = ({ navigation }) => {
  const [date, setDate] = useState(null);
  return (
    <View style={styles.screen}>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={(months) => {
          console.log('now these months are visible', months);
        }}
        onDayPress={(day) => navigation.navigate(routes.LOCATION_REPORT, day)}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        minDate={new Date()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CalendarScreen;
