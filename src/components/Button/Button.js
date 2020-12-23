import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const AndroidButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

AndroidButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string
};

AndroidButton.defaultProps = {
  onPress: () => alert('BUTTON_PRESS_HANDLER_NOT_PROVIDED'),
  title: 'BUTTON'
};

const styles = StyleSheet.create({
  container: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  label: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
});

export default AndroidButton;
