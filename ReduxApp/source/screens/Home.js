import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {FAB, LinearProgress} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';

// For Redux
import propTypes from 'prop-types';
import {deleteNote, markCompleted} from '../action/list';
import {connect} from 'react-redux';

// CONSTANTS
import {BG_COLOR, TEXT_COLOR, ICON_COLOR, SNACKBAR} from '../../Constants';
import randomColor from 'randomcolor';

const Home = ({navigation, markCompleted, deleteNote, listState}) => {
  const [loading, setLoading] = useState(false);
  // Reloading screen every times user sees

  const renderItem = ({item}) => <ListItem note={item} />;
  const ListItem = ({note}) => (
    <View
      style={{
        flex: 1,
        elevation: 8,
        borderRadius: 10,
        margin: 8,
        backgroundColor: randomColor({
          luminosity: 'light',
          hue: 'blue',
        }),
        // backgroundColor: randomColor({
        //   luminosity: 'light',
        //   hue: 'green',
        // }),
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
            deleteNote(note.id);
            SNACKBAR(note.name +' deleted successfully.')
          }}>
          <Icon name="trash" color={ICON_COLOR} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onLongPress={() => {
            SNACKBAR('EDIT:  Coming Soon...  🚨');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            flex: 1,
            alignContent: 'stretch',
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold', color: TEXT_COLOR}}>
            {note.name}
          </Text>
          <Text style={{fontSize: 16, color: TEXT_COLOR}}>
            {note.description}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginEnd: -20,
            justifyContent: 'center',
            padding: 5,
          }}>
          <CheckBox
            checkedColor={ICON_COLOR}
            uncheckedColor={TEXT_COLOR}
            size={30}
            onPress={() => {
              console.log('MarkingComplete.... ' + note.id);
              markCompleted(note.id);
            }}
            checked={note.isCompleted ? true : false}
          />
        </View>
      </View>
    </View>
  );

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
      {listState.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.heading}>No items found</Text>
          <Icon name="warning" size={70} color="yellow" />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={listState}
            renderItem={renderItem}
            keyExtractor={note => note.id}
          />
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

//////// REDUX CONFIG ////////

const mapStateToProps = state => ({
  listState: state.list,
});

const mapDispatchToProps = {
  deleteNote: id => deleteNote(id),
  markCompleted: id => markCompleted(id),
};

Home.prototype = {
  deleteNote: propTypes.func.isRequired,
  markCompleted: propTypes.func.isRequired,
  listState: propTypes.array.isRequired,
};

//////// REDUX EXPORT ////////
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: BG_COLOR,
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
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    marginVertical: 15,
    marginHorizontal: 5,
  },
  acationButton: {
    marginRight: 5,
    justifyContent: 'center',
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
