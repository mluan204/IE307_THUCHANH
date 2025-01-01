import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SettingsContext } from "../context/SettingsContext";
import { insertNote } from "../database/database";


const AddNotesScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {darkMode, fontSize} = useContext(SettingsContext);

    const saveNote = () => {
      if (!title) {
        alert('Please enter a title');
        return;
      }
    // Thạch Minh Luân - 22520827
      insertNote(title, content, () => {
        navigation.goBack(); 
      });
    };

     // Thạch Minh Luân - 22520827   
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: darkMode ? "#121212" : "#ebebeb"
      },
      input: {
        borderWidth: 1,
        borderColor: darkMode ? "#ebebeb" : "#121212",
        marginBottom: 20,
        padding: 10,
        fontSize: fontSize + 6,
        color: darkMode ? "#ebebeb" : "#121212"
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      button: {
        padding: 15,
        borderRadius: 100,
        marginHorizontal: 5
      },
  });

      // Thạch Minh Luân - 22520827
    return (
        <View style={styles.container}>
          <TextInput
            placeholder="Title"
            placeholderTextColor={darkMode ? "#fff" : "#333"}
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Content"
            placeholderTextColor={darkMode ? "#fff" : "#333"}
            value={content}
            onChangeText={(text) => setContent(text)}
            style={[styles.input, { height: 100 }]}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => navigation.goBack()} >
                 <Icon name='close' size={32} color={darkMode ? '#121212' : '#fff' }/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={saveNote}>
                <Icon name='check' size={32} color={darkMode ? '#121212' : '#fff' }/>
            </TouchableOpacity>
          </View>
        </View>
      );
}



export default AddNotesScreen;
