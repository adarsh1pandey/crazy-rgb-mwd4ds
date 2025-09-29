import { React } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Text,
} from "react-native";
import { useEffect } from "react";
import { useGetMemes } from "./hooks/useGetMemes";
import MemeCard from "./components/MemeCard";
import { TouchableOpacity } from "react-native-web";

const App = () => {
  const {
    getMeme,
    isLoading,
    memes,
    handleOnEndReached,
    handleOnTextInputChange,
    handleToggleNumberOfColumn,
    numberOfColumn,
    filterNSFWMemes,
    handleRetry,
  } = useGetMemes();

  useEffect(() => {
    getMeme({ pageNumber: 0 });
  }, []);

  const renderMemeCard = ({ item }) => {
    return (
      <MemeCard
        ups={item?.ups}
        title={item?.title}
        subreddit={item?.subreddit}
        memeImageUrl={item?.preview?.[0]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleOnTextInputChange}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleToggleNumberOfColumn}
      >
        <Text>Toggle the list </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={filterNSFWMemes}>
        <Text>Filter NSFW memes </Text>
      </TouchableOpacity>
      {!isLoading && memes?.length === 0 && <Text> No data found</Text>}
      {isLoading && <ActivityIndicator />}
      <FlatList
        key={numberOfColumn}
        data={memes}
        renderItem={renderMemeCard}
        numColumns={numberOfColumn}
        onEndReached={handleOnEndReached}
      />
      {!isLoading && memes?.length === 0 && (
        <TouchableOpacity style={styles.button} onPress={handleRetry}>
          <Text>Retry </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
  },
  button: {
    borderWidth: 2,
    alignSelf: "center",
  },
});
