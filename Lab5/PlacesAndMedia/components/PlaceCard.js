import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

export default function PlaceCard({ item, onDelete }) {
  const navigation = useNavigation();
  const deleteRow = async () => {
    console.log(item.id);
    const db = await SQLite.openDatabaseAsync("Places");
    await db.execAsync(
      `
      DELETE FROM PLACES WHERE id = ${item.id};
     `
    );

    // Call the onDelete function passed as prop to update the parent component
    onDelete(item.id);
  };

  const showDeleteConfirmation = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this place?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: deleteRow,
          style: "destructive",
        },
      ]
    );
  };

  // const GoToDetail = ({ item }) => {
  //   console.log(item);
  //   navigation.navigate("Content", { item: item });
  // };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={showDeleteConfirmation}
      onPress={() => navigation.navigate("Content", { item: item })}
    >
      <Image style={styles.img} source={{ uri: item.img }} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
  },
  img: {
    height: "100%",
    width: 120,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#777777",
    lineHeight: 20,
  },
});
