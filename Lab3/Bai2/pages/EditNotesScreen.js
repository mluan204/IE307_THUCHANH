import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SettingsContext } from '../context/SettingsContext';
import { updateNote, GetNotes } from '../database/database';

const EditNotesScreen = ({ route, navigation }) => {
  const { darkMode, fontSize } = useContext(SettingsContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { noteId } = route.params; // Lấy ID của ghi chú từ params
// Thạch Minh Luân - 22520827
  useEffect(() => {
    GetNotes((notes) => {
      const note = notes.find(note => note.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    });
  }, [noteId]);

  const saveChanges = () => {
    if (!title) {
      alert('Please enter a title');
      return;
    }

    updateNote(noteId, title, content, () => {
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
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: 'red' }]} 
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={32} color={darkMode ? '#000' : '#fff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={saveChanges}>
          <Icon name="check" size={32} color={darkMode ? '#000' : '#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default EditNotesScreen;
