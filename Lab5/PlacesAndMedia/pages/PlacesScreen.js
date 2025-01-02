import { View, Text, StyleSheet, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { useCallback, useEffect, useState, useContext } from "react";
import PlaceCard from "../components/PlaceCard";
import { useFocusEffect } from "@react-navigation/native";
import { LocationContext } from "../Context/LocationContext";
// Thạch Minh Luân - 22520827
export default function PlacesScreen() {
  const [places, setPlaces] = useState([]);
  const { setLocation } = useContext(LocationContext);

  useFocusEffect(
    useCallback(() => {
      const getData = async () => {
        const db = await SQLite.openDatabaseAsync("Places");
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS PLACES (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, img TEXT, latitude REAL, longitude REAL, address TEXT);
        `);

        const getPlaces = await db.getAllAsync("SELECT * FROM PLACES");
        console.log(getPlaces.map((pl) => pl.id));
        if (getPlaces != null) {
          setPlaces(getPlaces);
        }
      };
      setLocation(null);
      getData();
    }, [])
  );
  // Thạch Minh Luân - 22520827
  const deleteDB = async () => {
    const db = await SQLite.openDatabaseAsync("Places");
    await db.execAsync(`
      DELETE FROM PLACES
    `);
    setPlaces([]);
  };
  // Thạch Minh Luân - 22520827
  const handleDelete = (id) => {
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== id));
  };

  return (
    <View style={styles.container}>
      {places.length === 0 ? (
        <Text style={styles.emptyMessage}>
          No places added yet - start adding some!
        </Text>
      ) : (
        <FlatList
          style={styles.flatlist}
          data={places}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PlaceCard item={item} onDelete={handleDelete} />
          )}
        />
      )}
      {/* // Thạch Minh Luân - 22520827 */}
      {/* {places.length === 0 ? null : (
        <TouchableOpacity onPress={deleteDB} style={styles.deleteButton}>
          <Text style={styles.deleteText}>XÓA HẾT</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  flatlist: {
    width: "100%",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff4d4d",
    borderRadius: 25,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
