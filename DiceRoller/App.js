import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import DiceOne from './assets/dice1.png';
import DiceTwo from './assets/dice2.png';
import DiceThree from './assets/dice3.png';
import DiceFour from './assets/dice4.png';
import DiceFive from './assets/dice5.png';
import DiceSix from './assets/dice6.png';

const App = () => {
  const [diceFace1, setImage1] = useState(DiceOne);
  const [diceFace2, setImage2] = useState(DiceOne);

  // Handling the click on "Roll" button
  const RollHandler = () => {
    let diceFace1, diceFace2;
    // Generating random no from 1 to 6 for 1st dice
    let one = Math.floor(Math.random() * 6) + 1;
    // Checking and setting the image file
    switch (one) {
      case 1:
        diceFace1 = DiceOne;
        break;
      case 2:
        diceFace1 = DiceTwo;
        break;
      case 3:
        diceFace1 = DiceThree;
        break;
      case 4:
        diceFace1 = DiceFour;
        break;
      case 5:
        diceFace1 = DiceFive;
        break;
      case 6:
        diceFace1 = DiceSix;
        break;
      default:
        alert('Error in switch case');
        break;
    }
    setImage1(diceFace1);
    // Generating random no from 1 to 6 for 2nd dice
    let two = Math.floor(Math.random() * 6) + 1;
    // Checking and setting the image file
    switch (two) {
      case 1:
        diceFace2 = DiceOne;
        break;
      case 2:
        diceFace2 = DiceTwo;
        break;
      case 3:
        diceFace2 = DiceThree;
        break;
      case 4:
        diceFace2 = DiceFour;
        break;
      case 5:
        diceFace2 = DiceFive;
        break;
      case 6:
        diceFace2 = DiceSix;
        break;
      default:
        alert('Error in switch case');
        break;
    }
    setImage2(diceFace2);
  };
  return (
    <>
      <StatusBar backgroundColor="#E6425E" />
      {/* <Text style={styles.title}>Click on dice to roll</Text> */}
      <View style={styles.container}>
        <Image source={diceFace1} style={styles.image} />
        <Image source={diceFace2} style={styles.image} />
        <TouchableOpacity onPress={RollHandler} style={{marginTop: 120}}>
          <Text style={styles.buttonRoll}>Roll</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6425E',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  // title: {
  //   textAlign: 'center',
  //   backgroundColor: '#E6425E',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   padding: 10,
  // },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  buttonRoll: {
    backgroundColor: '#00D84A',
    alignSelf: 'flex-end',
    borderColor: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 8,
    color: 'white',
    marginRight: 2,
    borderWidth: 2,
    fontSize: 20,
    padding: 10,
    width: 150,
  },
});
