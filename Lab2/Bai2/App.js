import React, { useState } from 'react';
import { View, Text, Switch, Alert, StyleSheet } from 'react-native';
import Header from './compenents/Header';
import FormFeedBack from './compenents/FormFeedBack';
import FAQList from './compenents/FQAList';
import Settings from './compenents/Setting';

const App = () => {
// Thạch Minh Luân - 22520827
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  const HandleSendFeedBack = () => {
    if (feedback === '') return;
    setFeedbackList([feedback,...feedbackList]);
    setFeedback('');
    if(isNotificationsEnabled)
      Alert.alert('Thank you for your feedback!');
  }

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Header isDarkMode={isDarkMode}/>
      <Settings
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isNotificationsEnabled={isNotificationsEnabled}
        setIsNotificationsEnabled={setIsNotificationsEnabled}
      />

      <FormFeedBack
        feedback={feedback}
        setFeedback={setFeedback}
        HandleSendFeedBack={HandleSendFeedBack}
        isDarkMode={isDarkMode}
      />

      <FAQList
        feedbackList={feedbackList}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100
  },
  darkContainer: {
    backgroundColor: "#333"
  },
  lightContainer: {
    backgroundColor: "#fff"
  },
  // Thạch Minh Luân - 22520827
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    alignSelf: "center"
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
  listContainer: {
    marginTop: 20
  }
});
// Thạch Minh Luân - 22520827
export default App;
