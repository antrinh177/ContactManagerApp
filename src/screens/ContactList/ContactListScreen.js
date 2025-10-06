// src/screens/ContactList/ContactListScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

// Components
import ContactListItem from '../../components/common/ContactListItem';
import CustomInput from '../../components/common/CustomInput';
// Styles
import { GlobalStyles } from '../../styles/globalStyles';
// Context
import { useContacts } from '../../utils/ContactContext';
// Data
import { searchContacts } from '../../data/contactsData';

const ContactListScreen = ({ navigation }) => {
  const { contacts, toggleFavorite, loading } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = searchContacts(contacts, searchTerm);


  const handlePress = (contact) => {
    navigation.navigate('ContactDetails', { contactId: contact.id, contact: contact });
  };

  const handleFavoritePress = (contactId) => {
    toggleFavorite(contactId);
  };

  const handleCallPress = (phoneNumber) => {
    Alert.alert('Call', `Calling ${phoneNumber}...`);
  };

  const handleMessagePress = (phoneNumber) => {
    Alert.alert('Message', `Messaging ${phoneNumber}...`);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Manager</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddContact')}>
          <Text style={GlobalStyles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={GlobalStyles.searchContainer}>
        <CustomInput 
          placeholder="Search contacts..." 
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => (
            <ContactListItem
              contact={item}
              onPress={() => handlePress(item)}
              onFavoritePress={() => handleFavoritePress(item.id)}
              onCallPress={handleCallPress}
              onMessagePress={handleMessagePress}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={GlobalStyles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    ...GlobalStyles.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...GlobalStyles.headerTitle,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactListScreen;
