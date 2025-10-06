// src/screens/ContactDetails/ContactDetailsScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';

// Context
import { useContacts } from '../../utils/ContactContext';


// Styles

import { GlobalStyles, Colors, Fonts, Spacing } from '../../styles/globalStyles';

const ContactDetailsScreen = ({ route, navigation }) => {
    const { contact } = route.params;
    const { deleteContact } = useContacts();

    const handleDelete = () => {
      Alert.alert(
        "Delete Contact",
        `Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Delete", 
            onPress: async () => {
              await deleteContact(contact.id);
              navigation.goBack();
            },
            style: 'destructive'
          }
        ]
      );
    };

    return (
        <SafeAreaView style={GlobalStyles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={GlobalStyles.backButton}>{'< Back'}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{`${contact.firstName} ${contact.lastName}`}</Text>
                 {/* Empty view for spacing */}
                <View style={{ width: 50 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddContact', { contact })}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <View style={GlobalStyles.detailsContainer}>
                <Text style={GlobalStyles.detailText}>Company: {contact.company}</Text>
                <Text style={GlobalStyles.detailText}>Email: {contact.email}</Text>
                <Text style={GlobalStyles.detailText}>Phone: {contact.phone}</Text>
                <Text style={GlobalStyles.detailText}>Notes: {contact.notes}</Text>
            </View>

            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Contact</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

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
  editButton: {
    fontSize: Fonts.medium,
    color: Colors.primary,
    paddingRight: Spacing.md,
    textAlign: 'right',
  },
  deleteButtonContainer: {
    padding: Spacing.md,
  },
  deleteButton: {
    backgroundColor: Colors.accent,
    padding: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: Colors.text.light,
    fontWeight: 'bold',
    fontSize: Fonts.medium,
  },
});

export default ContactDetailsScreen;
