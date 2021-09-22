import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  Alert,
  BackHandler,
} from 'react-native';
import Icons from './components/Icons';
import Snackbar from 'react-native-snackbar';

import {Text, Container, Content, Card, H1, H3} from 'native-base';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  // players input/ game play

  const changeItem = itemNumber => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: 'white',
        textColor: 'red',
        textAlign: 'center',
      });
    }

    if (itemArray[itemNumber] == 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled.',
        backgroundColor: 'white',
        textColor: 'red',
      });
    }
    checkIsWinner();
  };

  // resetting and loading new game
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    itemArray.fill('empty', 0, 9);
  };
  const checkIsWinner = () => {
    /*
        # TicTacToe 9 Cells
        # Positioning acc to normal person
        | 1 | 2 | 3 |
        | 4 | 5 | 6 |
        | 7 | 8 | 9 |
      */

    if (
      itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[0]} won! 🎉`); // for 123
    } else if (
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5] &&
      itemArray[3] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[3]} won! 🎉`); // for 456
    } else if (
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8] &&
      itemArray[6] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[6]} won! 🎉`); // for 789
    } else if (
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[0]} won! 🎉`); // for 147
    } else if (
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7] &&
      itemArray[1] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[1]} won! 🎉`); // for 258
    } else if (
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8] &&
      itemArray[2] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[2]} won! 🎉`); // for 369
    } else if (
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8] &&
      itemArray[0] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[0]} won! 🎉`); // for 159
    } else if (
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6] &&
      itemArray[2] !== 'empty'
    ) {
      setWinMessage(`✨${itemArray[2]} won!`); // for 357
    }
    if (
      itemArray[0] !== 'empty' &&
      itemArray[1] !== 'empty' &&
      itemArray[2] !== 'empty' &&
      itemArray[3] !== 'empty' &&
      itemArray[4] !== 'empty' &&
      itemArray[5] !== 'empty' &&
      itemArray[6] !== 'empty' &&
      itemArray[7] !== 'empty' &&
      itemArray[8] !== 'empty'
    ) {
      setWinMessage('DRAW! 🙄');
    }
  };

  const exitHandler = () => {
    return Alert.alert('Exit', 'Dou you want to close the appication?', [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          reloadGame();
          BackHandler.exitApp();
        },
      },
    ]);
  };
  return (
    <>
      <StatusBar backgroundColor="#5A20CB" />
      <Container style={styles.container}>
        <Content>
          {winMessage ? (
            <View>
              <H1 style={styles.messages}>{winMessage}</H1>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={() => exitHandler()}
                  style={styles.exitButton}>
                  <Text style={{color: 'white'}}>Exit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={reloadGame}
                  style={styles.reloadButton}>
                  <Text style={{color: 'white'}}>Reload Game</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <H3 style={styles.messages}>
              Turn:
              {isCross ? 'Cross' : 'Circle'}
            </H3>
          )}
          <View style={styles.grid}>
            {itemArray.map((item, index) => (
              <TouchableOpacity
                style={styles.box}
                key={index}
                onPress={() => changeItem(index)}>
                <Card style={styles.card}>
                  <Icons name={item} />
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </Content>
      </Container>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5A20CB',
    padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '32.3%',
    marginEnd: 4,
  },
  card: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CAD5E2',
    borderRadius: 8,
  },
  messages: {
    textAlign: 'center',
    color: 'red',
    backgroundColor: '#51E1ED',
    fontWeight: 'bold',
    fontSize: 50,
    textTransform: 'capitalize',
    margin: 10,
    paddingVertical: 70,
    borderRadius: 8,
    marginVertical: 20,
  },
  reloadButton: {
    width: 200,
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#4DD637',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
  },
  exitButton: {
    width: 200,
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'red',
    borderWidth: 3,
  },
});
