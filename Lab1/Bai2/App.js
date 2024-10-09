import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { fruits_vegetables, workouts } from './data';
import { StyleSheet, Button, Text, View, FlatList, ImageBackground, SectionList, Image } from 'react-native';

{/* Thạch Minh Luân 22520827 */}
export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  const handleDeselect = (item) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item));
  };
{/* Thạch Minh Luân 22520827 */}
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        {/* FlatList */}
      <View style={styles.viewAlist}>
        {/* title  */}
        <View style={styles.viewTitle}>
          <Text style={styles.title}>FlatList - Workouts</Text>
        </View>
        
          {/* FlatList */}
        <ImageBackground source={require('./assets/workouts.jpg')}
            style={styles.imgBackground}>
        <View style={styles.viewOnImgbackground}>
        <FlatList
            keyExtractor={(item) => item.id}
            data={workouts}
            renderItem={({item}) => (
             <View style={styles.holder}>
                <Text style={styles.textType}>{item.type}</Text>
                  <View style={styles.list}>
                  {selectedItems.includes(item.type) ? (
                    <Button title="DESELECT" onPress={() => handleDeselect(item.type)} />
                  ) : (
                    <Button title="SELECT" onPress={() => handleSelect(item.type)} />
                  )}
                </View>
              </View>
            )}          
            />
        </View>
        </ImageBackground>
      </View>

    {/* Thạch Minh Luân 22520827 */}
      <View style={styles.viewAlist}>
        {/* title  */}
        <View style={styles.viewTitle}>
          <Text style={styles.title}>SectionList - Fruits & Vergetables</Text>
        </View>
          {/* SectionList */}
        <ImageBackground source={require('./assets/vergetables.jpg')}
            style={styles.imgBackground}>
        <View style={styles.viewOnImgbackground}>
        <SectionList
          sections={fruits_vegetables}
          renderItem={({item}) => (
            <View style={styles.holder}>
                <Text style={styles.textType}>{item}</Text>
                <View style={styles.list}>  
                {selectedItems.includes(item) ? (
                  <Button title="DESELECT" onPress={() => handleDeselect(item)} />
                ) : (
                  <Button title="SELECT" onPress={() => handleSelect(item)} />
                )}
              </View>
            </View>
          )}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({section: { title, url } }) => (
            <View style={styles.sectionHeader}>
                <Image source={{ uri: url }} style={styles.sectionImage} />
                <Text style={styles.sectionHeaderText}>{title}</Text>
            </View>
          )} 
          />
          {/* Thạch Minh Luân 22520827 */}
        </View>
        </ImageBackground>
      </View>

      {/* Selected */}
      <View style={styles.selectedContainer}>
        {/* Thạch Minh Luân 22520827 */}
        <Text style={styles.titleSelected}>SELECTED EXERCISES</Text>
        <View style={styles.selectedView}>
        <Text style={styles.listSelected}>{selectedItems.join(', ')}</Text>
        </View>
      </View>
    </View>
  );
}
{/* Thạch Minh Luân 22520827 */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '12%',
    alignItems: 'center',
  },
  title:{
    color: "#5300eb",
    width: '100%',
    height: '100%',
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSelected:{
    color: "#FF0000",
    width: '100%',
    height: '13%',
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  textType: {
    width: '65%',
    height: '100%',
    fontSize: 22,
    fontWeight: "500",
    textAlign: "left",
    textAlignVertical: "center",
    alignItems: "center",
    paddingStart: 7,
  },
  sectionHeaderText: { 
    fontSize: 26,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  listSelected: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "500",
    height: '100%',
    width: '100%'
  },
  holder: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginVertical:5,
    marginHorizontal: 10,
    borderRadius: 8,
    height: 50
  },
  sectionImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  imgBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '98%',
    marginStart: 6
  },
  selectedView: {
    width: '100%',
    height: '87%',
    marginTop: 15
  },
  selectedContainer: {
    height: '26%',
    width: '100%',
    marginTop: 15
  },
  sectionHeader: {
    backgroundColor: "#fcb900",
    alignSelf:"flex-start",
    marginStart: 40,
    paddingHorizontal:5,
    borderRadius: 5,
    flexDirection: 'row'
  },
  list: {
    width: '30%',
    height: '100%',
    paddingVertical: 5
  },
  viewTitle: {
    width: '100%',
    height: '10%',
  },
  viewAlist: {
    height: '37%',
    width: '100%'
  },
  viewOnImgbackground: {
    width: '100%',
    height: '95%',
    marginEnd: 5
  }
});
{/* Thạch Minh Luân 22520827 */}