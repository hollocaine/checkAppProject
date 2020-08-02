import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import Button from '../components/Button';
import Card from '../components/Card';
import colors from '../config/colors';
import reportsApi from '../api/reports';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import useApi from '../hooks/useApi';

function ReportsScreen({ navigation }) {
  const getReportsApi = useApi(reportsApi.getReports);
  useEffect(() => {
    getReportsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getReportsApi.loading} />
      <Screen style={styles.screen}>
        {getReportsApi.error && (
          <>
            <AppText>Couldn't retrieve the reports.</AppText>
            <Button title="Retry" onPress={getReportsApi.request} />
          </>
        )}
        <FlatList
          data={getReportsApi.data}
          keyExtractor={(report) => report.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              description={item.description}
              level={item.level}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.REPORTS_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ReportsScreen;
