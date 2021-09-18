import React from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Sound from 'react-native-sound';
const soundList = [
  require('./assets/one.wav'),
  require('./assets/two.wav'),
  require('./assets/three.wav'),
  require('./assets/four.wav'),
  require('./assets/five.wav'),
  require('./assets/six.wav'),
  require('./assets/seven.wav'),
  require('./assets/eight.wav'),
  require('./assets/nine.wav'),
  require('./assets/ten.wav'),
];

const App = () => {
  const logoClickHandler = props => {
    Linking.openURL(props.url).catch(err => {
      console.error('Failed opening page because: ', err);
      alert('Failed to open page');
    });
  };
  const playSound = props => {
    const soundVar = new Sound(props.sound, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('Not able to play sound');
      }
    });

    setTimeout(() => {
      soundVar.play();
    }, 200);

    soundVar.release();
  };
  return (
    <>
      <StatusBar backgroundColor="red" />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.logo}
          onPress={() =>
            logoClickHandler({url: 'https://web.learncodeonline.in'})
          }>
          <Image resizeMode="contain" source={require('./assets/logo.png')} />
          <Text
            style={
              (styles.text,
              {
                fontWeight: 'bold',
                fontSize: 30,
                marginTop: 30,
                color: 'white',
                fontFamily: 'Lobster',
              })
            }>
            LearnCodeOnline Inc.
          </Text>
        </TouchableOpacity>

        <View style={styles.gridContainer}>
          {soundList.map(sound => (
            <TouchableOpacity
              key={sound}
              style={styles.box}
              onPress={() => {
                playSound({sound});
              }}>
              <Text style={styles.text}>{sound}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    // backgroundColor: 'black',
    flex: 1,
    padding: 10,
  },
  logo: {
    width: '100%',
    height: 270,
    backgroundColor: '#4DD637',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: 'white',
  },
  box: {
    backgroundColor: 'purple',
    borderRadius: 8,
    width: '48%',
    height: 120,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightblue',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.28,
    shadowRadius: 8.65,
    elevation: 8,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
});
