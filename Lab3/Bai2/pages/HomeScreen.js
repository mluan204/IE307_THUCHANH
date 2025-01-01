import { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SettingsContext } from "../context/SettingsContext";
import { useIsFocused } from '@react-navigation/native';
import { GetNotes, deleteNote } from "../database/database";
import Note from "../stack/Note";

const HomeScreen = ({navigation}) =>{
    const {darkMode, SettingStyles} = useContext(SettingsContext);
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused(); 

    useEffect(() => {
        if (isFocused) {
            fetchNotes();
        }
    }, [isFocused]);
    // Thạch Minh Luân - 22520827
    const fetchNotes = () => {
        GetNotes((fetchedNotes) => {
            setNotes(fetchedNotes);
        });
    };

    const NoteItem = ({item}) => {
        return(
            <Note id={item.id} title={item.title} content={item.content} navigation={navigation} fetchNote={fetchNotes}/>
        )
    }

    // Thạch Minh Luân - 22520827
    return (
        <SafeAreaView style={SettingStyles.container}>
            <View style={styles.header}>
                <Text style={SettingStyles.header}>App Notes</Text>
            </View>

            <View style={styles.addnotesContainer}>
                <Text style={SettingStyles.txtAllNotes}>All notes</Text>
                <TouchableOpacity 
                style={SettingStyles.btnAddNotes} 
                onPress={() => navigation.navigate('AddNotesScreen')}>
                    <Icon name="plus" size={24} color={ darkMode ? '#333' : '#fff'}/>
                </TouchableOpacity>
            </View>

            <View style={styles.viewListNote}>
                <FlatList 
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={NoteItem}
                />
            </View>
        </SafeAreaView>
    )
}

    // Thạch Minh Luân - 22520827
const styles = StyleSheet.create ({
    header: {
        width: '100%',
        alignItems: 'center',
        margin: 8,
        marginTop: 100
    },
    containerChild:{
        width: '100%',
        alignItems: 'center',
        margin: 8
    },
    addnotesContainer: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center'
    },
    viewListNote: {
        width: "90%",
        alignSelf: "center",
        marginTop: 5
    },

});

export default HomeScreen;
