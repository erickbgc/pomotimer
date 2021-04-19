import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const pomoTimer = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.white}>
        Pomotimer App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7283D",
    alignItems: "center",
    justifyContent: 'center',
  },
  white: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 32,
  }
})


export default pomoTimer;