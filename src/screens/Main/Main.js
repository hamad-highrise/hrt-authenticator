import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../components';
// import PropTypes from 'prop-types';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      <Button />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'black'
  }
});

export default Main;
