import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={'Search...'} style={styles.input} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '95%',
    marginTop: 5,
    marginBottom: 5
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 25,
    height: 40,
    paddingLeft: 15
  }
});
