import React,{useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  Image,
  TextInput,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Home = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  return (
    <View style={styles.container}>
      <Image
        style={{alignSelf: 'center', height: 200, margin: 100}}
        source={require('../assets/logo_black.png')}
      />
      <View style={styles.serachBox}>
        <TextInput
          keyboardper
          maxLength={20}
          style={styles.textInput}
          placeholder=" John Doe"
          value={username}
          onChangeText={text => {
            setUsername(text);
          }}
        />
        <View style={{flex: 1, alignItems: 'flex-end', padding: 10}}>
          <Icon name="github" size={40} color="black" />
        </View>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 10,
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Details', {username});
        }}>
        <View
          style={{
            elevation: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 20, paddingEnd: 10}}>Search</Text>
          <Icon name="search" size={30} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    // justifyContent:'space-around'
  },
  logoContainer: {
    padding: 30,
    margin: 20,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
  },
  serachBox: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
  },
  textInput: {
    paddingTop: 10,
    paddingStart: 10,
    paddingBottom: 10,
    paddingEnd: 0,
    color: 'black',
    margin: 0,
    borderColor: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
