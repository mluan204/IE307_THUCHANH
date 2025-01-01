
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const  FormFeedBack= ({feedback, setFeedback, HandleSendFeedBack, isDarkMode}) => (
    <View>
      <Text style={[styles.fbtitle, isDarkMode ? styles.darkText : styles.lightText]}>Feedback</Text>
      <TextInput 
        style={isDarkMode ? styles.darkInput : styles.lightInput}
        placeholder="Your feedback here.."
        placeholderTextColor={isDarkMode ? "#ccc" : "#666"}
        value={feedback}
        onChangeText={setFeedback}
      />
      <Button 
        title='SEND FEEDBACK'
        onPress={HandleSendFeedBack}
      />
    </View>
)
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    darkText: {
        fontSize: 20,
        color: "#fff"
      },
      lightText: {
        fontSize: 20,
        color: "#0a0a0a"
      },
      fbtitle: {
        fontSize: 18,
        padding: 5,
        fontWeight: 'bold'
      },
      darkInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: '#555',
        color: '#fff',
      },
      lightInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: '#ccc',
        color: '#000',
      },
});

export default FormFeedBack;