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
  const [diceFace, setImage] = useState(DiceOne);

  // Handling the click on "Roll" button
  const RollHandler = () => {
    let diceFace;
    // Generating random no from 1 to 6
    // Checking and setting the image file
    switch (Math.floor(Math.random() * 6) + 1) {
      case 1:
        diceFace = DiceOne;
        break;
      case 2:
        diceFace = DiceTwo;
        break;
      case 3:
        diceFace = DiceThree;
        break;
      case 4:
        diceFace = DiceFour;
        break;
      case 5:
        diceFace = DiceFive;
        break;
      case 6:
        diceFace = DiceSix;
        break;
      default:
        alert('Error in switch case');
        break;
    }
    console.log(diceFace);
    setImage(diceFace);
  };
  return (
    <>
      <StatusBar backgroundColor="#E6425E" />
      <View style={styles.container}>
        <Image source={diceFace} style={styles.image} />
        <TouchableOpacity onPress={RollHandler}>
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
  image: {
    width: 250,
    height: 250,
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
    marginTop: 120,
    borderWidth: 2,
    fontSize: 20,
    padding: 10,
    width: 150,
  },
});
