
import { ScrollView, Text, StyleSheet } from 'react-native';

const FAQList = ({ feedbackList, isDarkMode }) => (
    <ScrollView style={styles.listContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>Frequently Asked Questions</Text>
      {feedbackList.map((item, index) => (
        <Text key={index} style={isDarkMode ? styles.darkText : styles.lightText}>
          Q: {item}
        </Text>
      ))}
    </ScrollView>
  );
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create({
    listContainer: {
        marginTop: 20
    },
    darkText: {
        fontSize: 20,
        color: "#fff"
    },
      lightText: {
        fontSize: 20,
        color: "#0a0a0a"
    },
});

export default FAQList;