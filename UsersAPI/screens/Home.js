import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import Axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
// for Navigation
import {useIsFocused} from '@react-navigation/native';
import {Avatar, FAB, LinearProgress} from 'react-native-elements';
import Constants from '../Constants';

// For generating random COLORS
const randomColor = require('randomcolor');

const Home = ({navigation, route}) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchDetails = async () => {
    // Showing loading screen
    setLoading(true);
    // Connecting and fetching the data from RESTful API
    try {
      const response = await Axios.get(Constants.BASE_URL);
      // all details copied
      const data = response.data;

      // Setting the response data to list
      setUserList(data);
    } catch (err) {
      console.log(err);
    }
    // Stopping loading screen
    setLoading(false);
  };

  // ===== Deleting Feature ===== START
  const askToDelete = user => {
    return Alert.alert('Delete', `Do you want to delete ${user.name}?`, [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          deleteUser(user.id);
        },
      },
    ]);
  };
  // Deleting user with id
  const deleteUser = async id => {
    // deleting item from UserList (Loaded Data)
    const idRemovedList = userList.filter(list => list.id !== id);

    // updating it into API
    await Axios.delete(
      `${Constants.BASE_URL}/delete/${id}/${Constants.API_KEY}`,
      {
        id,
      },
    );
    // updating the screen
    setUserList(idRemovedList);
  };
  // ===== Deleting Feature ===== END

  // ====== List Items UI ======= START
  const renderItem = ({item}) => (
    <ListItem
      user={item}
      color={randomColor({
        luminosity: 'light',
        hue: 'blue',
      })}
    />
  );
  const ListItem = ({user, color}) => (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        marginBottom: 15,
        // backgroundColor: '#4d4d4d',
        backgroundColor: color,
        elevation: 8,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 16,
        }}>
        <TouchableOpacity
          style={{
            padding: 0,
            marginEnd: 5,
            justifyContent: 'center',
          }}
          onPress={() => {
            // Click on Avatar
          }}>
          <Avatar
            icon={{name: 'person'}}
            rounded
            // size="xlarge"
            size={120}
            source={{
              uri: user.image,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onLongPress={() => {
            // Navigate to Edit screen
            navigation.navigate('Edit', {user, color});
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: 1,
            alignContent: 'stretch',
          }}>
          <Text style={styles.title}>{user.name}</Text>
          <Text style={styles.subTitle}>Email: {user.email}</Text>
          <Text style={styles.subTitle}>Age: {user.age}</Text>
          <Text style={styles.subTitle}>DOB: {user.dob}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 0,
            marginStart: 5,
            justifyContent: 'center',
          }}
          onPress={() => {
            askToDelete(user);
          }}>
          <Icon name="trash" color="red" size={30} />
        </TouchableOpacity>
        {/*Put New elements*/}
      </View>
    </View>
  );
  // ====== List Items UI ======= END

  // Re loading every time user sees a screen
  useEffect(() => {
    fetchDetails();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.heading}>Loading...</Text>
        <LinearProgress color="#000" style={{margin: 20, fontSize: 20}} />
      </View>
    );
  }
  return (
    <SafeAreaView
      contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}
      style={styles.container}>
      {userList == null && userList.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.heading}>Empty user list</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={userList}
            renderItem={renderItem}
            keyExtractor={users => users.id}
          />
        </View>
      )}
      <FAB
        title="Create"
        titleStyle={{color: 'black'}}
        onPress={() => {
          navigation.navigate('Add');
        }}
        size="small"
        placement="right"
        icon={{name: 'add', color: 'black'}}
        color="#ff9999"
        style={styles.fabStyle}
      />
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 5,
  },
  emptyContainer: {
    backgroundColor: '#ff9999',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    // color: 'white',
    color: 'black',
  },
  subTitle: {
    fontSize: 16,
    // color: '#CAD5E2'
    color: 'black',
  },
  fabStyle: {
    borderColor: '#ff9999',
    borderWidth: 10,
    elevation: 10,
    alignSelf: 'flex-end',
  },
});
