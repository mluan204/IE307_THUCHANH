import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SettingsContext } from "../context/SettingsContext"
import { useContext } from "react"
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteNote } from "../database/database";

const Note = ({id, title, content, navigation, fetchNote}) => {
    const {SettingStyles, darkMode} = useContext(SettingsContext)

    const DeleteNote = () => {
        deleteNote(id);
        fetchNote()
    }
// Thạch Minh Luân - 22520827
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            borderWidth: 0.5,
            marginVertical: 8,
            flexDirection: "row",
            borderColor: darkMode ? '#fff' : '#333', 
        },
        noteItem: {
            width: '90%',
            padding: 10,   
        },
        btnContainer: {
            justifyContent: "center"
        },
    
    })
// Thạch Minh Luân - 22520827
    return (
        <View style={styles.container}>
            <View style={styles.noteItem}>
                <TouchableOpacity onPress={() => navigation.navigate('EditNotesScreen', { noteId: id })}>
                    <Text style={SettingStyles.txtAllNotes}>{title}</Text>
                    <Text style={SettingStyles.txtContent}>{content}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.Trash} onPress={DeleteNote}>
                    <Icon name="trash" size={36} color={darkMode ? "#fff" : "#555"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}



export default Note;

