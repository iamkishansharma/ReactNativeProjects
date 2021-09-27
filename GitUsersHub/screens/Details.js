import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Axios from 'axios';
import {Avatar, LinearProgress} from 'react-native-elements';

const URL = 'https://api.github.com/users';

const Details = ({navigation, route}) => {
  const [receivedUser, setReceivedUser] = useState('');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    avatar_url: '',
    name: '',
    login: '',
    bio: '',
    company: '',
  });

  const fetchDetails = async () => {
    // Showing loading screen
    setLoading(true);
    // Connecting and fetching the data from RESTful API
    try {
      const response = await Axios.get(`${URL}/${receivedUser}`);
      // users' all details copied
      const data1 = response.data;

      ////////////////
      // setting the received data to local object
      console.log(data1);
      setData(data1);
    } catch (err) {
      console.log(err);
    }
    // Stopping loading screen
    setLoading(false);
  };

  // Re loading every time user sees a screen
  useEffect(() => {
    const {username} = route.params;
    setReceivedUser(username);

    setTimeout(() => {
      fetchDetails();
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.heading}>Loading...</Text>
        <LinearProgress color="#000" style={{margin: 20, fontSize: 20}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>You have given me: {receivedUser}</Text>

      {data == null || data.name == null ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.heading}>Empty user list</Text>
        </View>
      ) : (
        <>
          <Avatar source={{uri: data.avatar_url}} size="xlarge" />
          <Text style={styles.heading}>Country: {data.location}</Text>
        </>
      )}
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
  },
  heading: {
    textAlign: 'center',
    color: 'red',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    paddingVertical: 50,
    marginHorizontal: 5,
  },
  emptyContainer: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
