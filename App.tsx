// src/App.tsx

import React, { useState } from "react";
import {
  Text,
  SafeAreaView
} from 'react-native';

// Screens
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen';

// Context
import { ContactProvider } from './src/utils/ContactContext';




const App = () => {
  const [stack, setStack] = useState([{ name: 'ContactList', params: {} }]);

  const navigate = (name: any, params = {}) => {
    setStack(prevStack => [...prevStack, { name, params }]);
  };

  const goBack = () => {
    setStack(prevStack => (prevStack.length > 1 ? prevStack.slice(0, -1) : prevStack));
  };

  const renderScreen = () => {
    const currentScreen = stack[stack.length - 1];
    const navigation = { navigate, goBack };
    const route = { params: currentScreen.params };

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

  return (
    <ContactProvider>
      {renderScreen()}
    </ContactProvider>
  );
};

export default App;