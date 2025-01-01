import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";
import Icon from "react-native-vector-icons/FontAwesome6";
import { Video } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";

const MediaScreen = ({ navigation }) => {
  const [media, setMedia] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
          const mediaAssets = await MediaLibrary.getAssetsAsync({
            sortBy: "creationTime",
            mediaType: ["video", "photo"],
          });

          const detailedMedia = await Promise.all(
            mediaAssets.assets.map(async (item) => {
              const assetInfo = await MediaLibrary.getAssetInfoAsync(item.id);
              return {
                creationTime: assetInfo.creationTime || item.creationTime,
                localUri: assetInfo.localUri || item.uri,
                mediaType: item.mediaType,
              };
            })
          );

          setMedia(
            detailedMedia.sort((a, b) => b.creationTime - a.creationTime)
          );
        }
      })();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="video"
          size={25}
          color="red"
          onPress={() => navigation.navigate("VideoRecord")}
          style={{ marginRight: 20 }}
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => {
    if (item.mediaType === "video") {
      return (
        <Video
          source={{ uri: item.localUri }}
          style={styles.image}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      );
    } else {
      return <Image source={{ uri: item.localUri }} style={styles.image} />;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 170,
    height: 250,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
  },
  flatListContentContainer: {
    width: "100%",
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MediaScreen;
