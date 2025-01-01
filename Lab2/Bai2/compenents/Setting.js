
import { View, StyleSheet, Text, Switch } from "react-native"

const Settings = ({isDarkMode, setIsDarkMode, isNotificationsEnabled, setIsNotificationsEnabled}) => {
    return (
        <View>
                <View style={styles.switchContainer}>
                    <Text style={isDarkMode ? styles.darkText : styles.lightText}>Dark mode</Text>
                    <Switch value={isDarkMode} onValueChange={setIsDarkMode}/>
                </View>

                <View style={styles.switchContainer}>
                    <Text style={isDarkMode ? styles.darkText : styles.lightText}>Notifications</Text>
                    <Switch value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled}/>
                </View>
        </View>
    )
}
// Thạch Minh Luân - 22520827
const styles = StyleSheet.create ({
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
})

export default Settings;