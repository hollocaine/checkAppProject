import { AsyncStorage } from 'react-native';
import moment from 'moment';

const prefix = 'cache';
const expiryInMinutes = 5;
const isExpired = (item) => {
  //See if expired
  const now = moment(Date.now()); //Current date time
  const storedTime = moment(item.timestamp); //
  const isExpired = now.diff(storedTime, 'minutes') > expiryInMinutes;
  return now;
};
const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;

    //if stored more than 5  minutes ago its expired
    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const store = async (key, value) => {
  try {
    const item = { value, timestamp: Date.now() };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
};
