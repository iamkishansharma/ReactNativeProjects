import React, {useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const currencyPerRupee = [
  {id: 1, name: 'USD', value: 117.4},
  {id: 2, name: 'CAD', value: 92.8},
  {id: 3, name: 'AUD', value: 85.7},
  {id: 4, name: 'HKD', value: 15.08},
  {id: 5, name: 'EURO', value: 138.2},
  {id: 6, name: 'INR', value: 1.6},
  {id: 7, name: 'AED', value: 31.94},
];

const App = () => {
  const [inputVal, setInputVal] = useState(0);
  const [resultVal, setResultVal] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('117.4');

  function inputChangeHandler(currency, value) {
    let res = value / currency;
    setResultVal(res.toFixed(2));
  }

  const logoClickHandler = props => {
    Linking.openURL(props.url).catch(err => {
      console.error('Failed opening page because: ', err);
      alert('Failed to open page');
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#383CC1" />
      <ScrollView
        style={{backgroundColor: '#383CC1'}}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() =>
              logoClickHandler({url: 'https://web.learncodeonline.in'})
            }>
            <View style={styles.imageCountainer}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('./assets/exchange.png')}
              />
              <Text style={styles.title}>LearnCodeOnline Inc.</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCurrency}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCurrency(itemValue);
                inputChangeHandler(itemValue, inputVal);
              }}>
              {/* <Picker.Item label="Java" value="java" /> */}
              {currencyPerRupee.map(currency => (
                <Picker.Item
                  style={{color: 'white'}}
                  key={currency.id}
                  label={currency.name}
                  value={currency.value}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultValue}>{resultVal}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputValue}
              keyboardType="number-pad"
              placeholder="Enter amount in NPR"
              placeholderTextColor="#00D84A"
              maxLength={15}
              onChangeText={text => {
                setInputVal(Number(text.trim()));
                inputChangeHandler(selectedCurrency, Number(text.trim()));
              }}></TextInput>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageCountainer: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'yellow',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 200,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Lobster',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  pickerContainer: {
    backgroundColor: 'red',
    color: 'white',
    height: 80,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 80,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor: '#120E43',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  resultValue: {
    color: 'white',
    fontSize: 70,
    padding: 20,
    fontWeight: 'bold',
    fontFamily: 'Lobster',
  },
  inputContainer: {
    height: 80,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#fff',
    backgroundColor: '#120E43',
    borderWidth: 2,
    alignItems: 'center',
  },
  inputValue: {
    flexWrap: 'wrap',
    color: 'red',
    fontSize: 25,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
