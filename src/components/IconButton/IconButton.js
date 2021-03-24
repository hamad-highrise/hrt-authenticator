import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const IconButton = ({ children, onPress, param }) => {
  const onIconPress = () => {
    onPress(param);
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onIconPress}>
      <View style={styles.iconContainer}>{children}</View>
    </TouchableOpacity>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  param: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40
  },
  iconContainer: {}
});

export default IconButton;
