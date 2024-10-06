import React, { useState } from 'react';
import { View, Text, Switch, Alert, StyleSheet } from 'react-native';
import Header from './compenents/Header';
import FormFeedBack from './compenents/FormFeedBack';
import FAQList from './compenents/FQAList';

const App = () => {


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
      <View style={styles.switchContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dark mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode}/>
      </View>

      <View style={styles.switchContainer}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText}>Notifications</Text>
        <Switch value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled}/>
      </View>

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
  switchContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 20
  },
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
  listContainer: {
    marginTop: 20
  }
});

export default App;
