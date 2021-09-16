import React, {useState} from 'react';
import {Button, Text, StyleSheet, View, StatusBar} from 'react-native';

const App = () => {
  //variables
  const [title, setTitle] = useState('rgb(32,0,126)');
  const [bgColor, setBgColor] = useState('rgb(32,0,126)');

  // functin that handles the clicks of "Click Me" text
  const changeHandler = props => {
    let color;
    if (props.change === 'change') {
      color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256,
      )},${Math.floor(Math.random() * 256)})`;
    } else {
      color = 'rgb(0,0,0)';
    }
    setTitle(`Color Code:\n${color}`);
    setBgColor(color);
  };
  return (
    <>
      <StatusBar backgroundColor={bgColor} />
      <View style={[styles.container, {backgroundColor: `${bgColor}`}]}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <Text
          style={[styles.buttonChangeColor, {color: bgColor}]}
          onPress={() => changeHandler({change: 'change'})}>
          Change
        </Text>
        <Text style={styles.buttonReset} onPress={() => changeHandler('reset')}>
          Reset
        </Text>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    padding: 20,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChangeColor: {
    backgroundColor: '#383CC1',
    flex: 1,
    fontSize: 18,
    padding: 10,
    marginRight: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonReset: {
    backgroundColor: '#E21717',
    color: 'black',
    flex: 1,
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
