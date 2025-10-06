# Project Evolution: Summary of Changes

This document summarizes the key changes, refactoring, and feature implementations made to the Contact Manager application.

## 1. Initial Setup & Critical Bug Fixes

- **Resolved Application Crash**: The app was initially crashing due to incorrect props being passed to the `ContactListItem` component. This was fixed by passing a single `contact` object instead of individual props.
- **Fixed Missing Modules**: Resolved an "Unable to resolve module" error by creating the missing `CustomButton.js` component.
- **Corrected Context Usage**: Fixed the "useContacts must be used within a ContactProvider" error by wrapping the main application component in `App.tsx` with the `ContactProvider`.
- **Resolved TypeScript Errors**: Addressed type errors by providing mock `navigation` and `route` props to screens that required them.

## 2. Core Architecture: State-Based Navigation

- **Implemented a Navigation System**: Replaced the static rendering of screens in `App.tsx` with a custom, state-based navigation stack.
- **Introduced Navigation State**: Added a `stack` state variable to manage the navigation history.
- **Created Navigation Functions**: Implemented `navigate` and `goBack` functions to manipulate the navigation stack, allowing for screen transitions.
- **Conditional Screen Rendering**: Created a `renderScreen` function to conditionally render the active screen based on the current navigation state.

## 3. Code Organization & Refactoring

- **Screen Abstraction**: Refactored the inline `ContactListScreen` and `ContactDetailsScreen` components from `App.tsx` into their own dedicated files within the `src/screens/` directory. This significantly cleaned up `App.tsx`, leaving it to manage navigation and context.
- **Centralized Styling**: Migrated common styles from `App.tsx` into `src/styles/globalStyles.js`, promoting reusability and a consistent look and feel across the application.

## 4. Feature Implementation & Enhancements

- **Search Functionality**:
    - Improved the `searchContacts` function in `contactsData.js` to correctly handle multi-word search queries.
    - Integrated the search functionality into the `ContactListScreen` with a search bar that filters contacts in real-time.
- **Contact Editing**:
    - Implemented the logic to trigger the "edit mode" of the `AddContactScreen`.
    - Added an "Edit" button to the `ContactDetailsScreen` that navigates to the `AddContactScreen` and pre-fills the form with the selected contact's data.
- **Contact Deletion**:
    - Added a "Delete Contact" button to the `ContactDetailsScreen`.
    - Implemented a confirmation alert to prevent accidental deletions.
    - Wired up the button to the `deleteContact` function from the `ContactContext`.
- **Favorite Toggling**:
    - Connected the star icon on the `ContactListItem` to the `toggleFavorite` function from the `ContactContext`. Users can now mark and unmark contacts as favorites.
- **Loading Indicator**:
    - Implemented a loading indicator (`ActivityIndicator`) on the `ContactListScreen` that displays while contacts are being loaded from `AsyncStorage` on app startup.

## 5. UI & Styling Enhancements

- **Fixed Floating Label Bug**: Resolved a UI bug in the `CustomInput` component where a white rectangle was covering the placeholder text by removing the unnecessary `backgroundColor` from the animated label style.
- **Added Screen Headers**: Implemented consistent headers with "Back" buttons and titles on the `ContactDetailsScreen` and `AddContactScreen` for improved user navigation.