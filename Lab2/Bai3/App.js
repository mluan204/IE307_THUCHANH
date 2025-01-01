
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigations/AppNavigator';
// Thạch Minh Luân - 22520827
const App = () => {
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
};

export default App;
