import React, { useState, Suspense } from "react";
import {
  Text,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

// Lazy load screens
const AddContactScreen = React.lazy(() => import('./src/screens/AddContact/AddContactScreen'));
const ContactListScreen = React.lazy(() => import('./src/screens/ContactList/ContactListScreen'));
const ContactDetailsScreen = React.lazy(() => import('./src/screens/ContactDetails/ContactDetailsScreen'));

// Utils components
import { ContactProvider } from './src/utils/ContactContext';

const App = () => {
  // Use navigation stack to manage state.
  const [stack, setStack] = useState([{ name: 'ContactList', params: {} }]);

  // Function to move to new screen by adding new screen to the stack
  const navigate = (name: any, params = {}) => {
    setStack(prevStack => [...prevStack, { name, params }]);
  };

  // Function to go back to previous screen by removing the top screen from the stack
  const goBack = () => {
    setStack(prevStack => (prevStack.length > 1 ? prevStack.slice(0, -1) : prevStack));
  };

  // Render the current screen based on the top of the stack
  const renderScreen = () => {
    const currentScreen = stack[stack.length - 1];
    const navigation = { navigate, goBack };
    const route = { params: currentScreen.params };

    // Condition to render the appropriate screen component
    switch (currentScreen.name) {
      case 'ContactList':
        return <ContactListScreen navigation={navigation} />;
      case 'AddContact':
        return <AddContactScreen navigation={navigation} route={route} />;
      case 'ContactDetails':
        return <ContactDetailsScreen navigation={navigation} route={route} />;
      default:
        return (
          <SafeAreaView>
            <Text>Screen not found: {currentScreen.name}</Text>
          </SafeAreaView>
        );
    }
  };

  // Wrap the app in ContactProvider so all screens have access to shared context
  return (
    <ContactProvider>
      <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
        {renderScreen()}
      </Suspense>
    </ContactProvider>
  );
};

export default App;