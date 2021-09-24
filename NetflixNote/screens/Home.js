import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import {FAB, LinearProgress} from 'react-native-elements';

import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';

const Home = ({navigation, route}) => {
  const [listOfSeries, setListOfSeries] = useState();
  const [loading, setLoading] = useState(false);
  // Reloading screen every times user sees
  const isFocused = useIsFocused();

  const getList = async () => {
    // Start loading
    setLoading(true);
    // Get objects from AsyncStorage
    const storedValue = await AsyncStorage.getItem('@series_list');
    if (!storedValue) {
      setListOfSeries([]);
    }
    const list = JSON.parse(storedValue);
    setListOfSeries(list);

    // Stop loading
    setLoading(false);
  };

  const askToDelete = series => {
    return Alert.alert('Delete', `Do you want to delete ${series.name}?`, [
      {text: 'No'},
      {
        text: 'Yes',
        onPress: () => {
          deleteSeries(series.id);
        },
      },
    ]);
  };
  // Deleting the series with id
  const deleteSeries = async id => {
    const idRemovedList = await listOfSeries.filter(list => list.id !== id);

    // updating it into AsyncStorage
    await AsyncStorage.setItem('@series_list', JSON.stringify(idRemovedList));
    // updating the screen
    setListOfSeries(idRemovedList);
  };

  const markWatched = async ({id}) => {
    const newList = listOfSeries.map(list => {
      if (list.id == id) {
        list.isWatched = !list.isWatched;
      }
      return list;
    });

    // updating it into AsyncStorage
    await AsyncStorage.setItem('@series_list', JSON.stringify(newList));
    // updateing the screen
    setListOfSeries(newList);
  };

  const renderItem = ({item}) => <ListItem series={item} />;
  const ListItem = ({series}) => (
    <View
      style={{
        flex: 1,
        borderRadius: 20,
        margin: 5,
        backgroundColor: '#4d4d4d',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 16,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            marginEnd: 5,
            justifyContent: 'center',
          }}
          onPress={() => {
            askToDelete(series);
          }}>
          <Icon name="trash" color="red" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onLongPress={() => {
            navigation.navigate('Edit', {series});
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: 1,
            alignContent: 'stretch',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
            {series.name}
          </Text>
          <Text style={{fontSize: 16, color: '#CAD5E2'}}>
            {series.totalNoOfSeason} seasons to watch
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginEnd: -20,
            justifyContent: 'center',
            padding: 5,
          }}>
          <CheckBox
            checkedColor="#50DBB4"
            size={30}
            onPress={() => {
              markWatched({id: series.id});
            }}
            checked={series.isWatched ? true : false}
          />
        </View>
      </View>
    </View>
  );

  // loading while app loads up
  useEffect(() => {
    getList();
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.heading}>Loading...</Text>
        <LinearProgress color="white" style={{fontSize: 20}} />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#363636" />

      {listOfSeries == null || listOfSeries.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.heading}>No items Found</Text>
          <Image
            style={{width: 300, height: 300}}
            source={require('../assets/doge.png')}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={listOfSeries}
            renderItem={renderItem}
            keyExtractor={series => series.id}
          />

          <Image
            style={styles.logo}
            source={require('../assets/netflix.png')}></Image>
        </View>
      )}
      <FAB
        onPress={() => {
          navigation.navigate('Add');
        }}
        size="small"
        placement="right"
        icon={{name: 'add', color: 'white'}}
        color="#3d3d3d"
        style={styles.fabStyle}
      />
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#292929',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabStyle: {
    borderColor: '#3d3d3d',
    borderWidth: 10,
    borderRadius: 100,
    elevation: 10,
  },

  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: 'white',
    fontSize: 40,
    marginVertical: 15,
    marginHorizontal: 5,
  },
  acationButton: {
    marginRight: 5,
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    backgroundColor: '#2d2d2d',
    alignSelf: 'center',
    width: '60%',
    height: 60,
    margin: 20,
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
