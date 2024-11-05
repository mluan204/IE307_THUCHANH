
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigations/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
};

export default App;
