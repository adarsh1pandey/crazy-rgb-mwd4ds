import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

interface IMemeCardProps {
  title: string;
  subreddit: string;
  ups: number;
  memeImageUrl: string;
}

const MemeCard: React.FC<IMemeCardProps> = ({
  title,
  subreddit,
  ups,
  memeImageUrl,
}) => {
  return (
    <View style={{ borderWidth: 1 }}>
      <Image source={{ uri: memeImageUrl }} style={styles.image} />
      <Text>{title} </Text>
      <Text>{subreddit} </Text>
      <Text>{ups} </Text>
    </View>
  );
};

export default MemeCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
