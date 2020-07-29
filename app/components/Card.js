import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';
import Button from '../components/Button';
import Text from './Text';
import colors from '../config/colors';
import { useRoute } from '@react-navigation/native';

function Card({ title, description, level, imageUrl, onPress, thumbnailUrl }) {
  const [showImage, setShowImage] = useState(false);
  const route = useRoute();
  const is_report = false;
  if (route.name === 'Reports') is_report ? true : false;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {showImage && (
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
        )}
        <MaterialCommunityIcons
          name={showImage ? 'close-circle' : 'image'}
          size={35}
          onPress={() =>
            showImage === false ? setShowImage(true) : setShowImage(false)
          }
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={6}>
            {description}
          </Text>
          <Text style={styles.level} numberOfLines={1}>
            {level}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: 'bold',
  },

  title: {
    marginBottom: 7,
  },
});

export default Card;
